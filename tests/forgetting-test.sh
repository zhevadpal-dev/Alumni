#!/usr/bin/env bash
# ==============================================================================
# The Forgetting Test: In-Memory Lifecycle Verification
# Alumni Tracking System
# 
# Purpose:
# Validates that the application's in-memory storage lifecycle behaves as designed:
# 1. Creates a record in the running container.
# 2. Verifies the record is retrievable (HTTP 200).
# 3. Executes `docker compose down` followed by `docker compose up -d`.
# 4. Verifies the ephemeral record was "forgotten" upon container reboot (HTTP 404),
#    confirming zero uncommitted disk persistence before PostgreSQL database integration.
# ==============================================================================

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5001}"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Running: The Forgetting Test (In-Memory Lifecycle)   ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Step 1: Create a test record
echo -e "\n${YELLOW}[Step 1/4] Creating an ephemeral user record...${NC}"
CREATE_RESP=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Forgetting Test User",
    "email": "forgetting-auto-test@example.com",
    "role": "alumni",
    "department": "Computer Science",
    "graduationYear": 2025
  }')

HTTP_CODE=$(echo "$CREATE_RESP" | tail -n 1)
BODY=$(echo "$CREATE_RESP" | sed '$d')

if [ "$HTTP_CODE" -ne 201 ]; then
  echo -e "${RED}FAIL: Expected HTTP 201 Created, got ${HTTP_CODE}${NC}"
  echo "$BODY"
  exit 1
fi

RECORD_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -n 1 | cut -d':' -f2)
echo -e "${GREEN}✓ Record created successfully with ID: ${RECORD_ID}${NC}"

# Step 2: Verify record exists
echo -e "\n${YELLOW}[Step 2/4] Verifying record exists before reboot...${NC}"
CHECK_RESP=$(curl -s -w "\n%{http_code}" "${BASE_URL}/api/users/${RECORD_ID}")
CHECK_CODE=$(echo "$CHECK_RESP" | tail -n 1)

if [ "$CHECK_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ Record ${RECORD_ID} verified in memory (HTTP 200 OK)${NC}"
else
  echo -e "${RED}FAIL: Expected HTTP 200 OK before reboot, got ${CHECK_CODE}${NC}"
  exit 1
fi

# Step 3: Docker down and up
echo -e "\n${YELLOW}[Step 3/4] Restarting containers (docker compose down && up)...${NC}"
DOCKER_BIN="$(which docker 2>/dev/null || echo "$HOME/.docker/bin/docker")"
"$DOCKER_BIN" compose down
"$DOCKER_BIN" compose up -d

echo "Waiting for app service to become healthy..."
MAX_RETRIES=20
RETRY=0
until curl -s -o /dev/null "${BASE_URL}/api/health"; do
  sleep 1
  RETRY=$((RETRY + 1))
  if [ "$RETRY" -ge "$MAX_RETRIES" ]; then
    echo -e "${RED}FAIL: App service did not recover within ${MAX_RETRIES}s${NC}"
    exit 1
  fi
done
echo -e "${GREEN}✓ Container rebooted and service is responsive${NC}"

# Step 4: Verify record was forgotten
echo -e "\n${YELLOW}[Step 4/4] Checking record existence after reboot...${NC}"
POST_RESP=$(curl -s -w "\n%{http_code}" "${BASE_URL}/api/users/${RECORD_ID}")
POST_CODE=$(echo "$POST_RESP" | tail -n 1)

if [ "$POST_CODE" -eq 404 ]; then
  echo -e "${GREEN}✓ SUCCESS: Record ${RECORD_ID} was forgotten as expected (HTTP 404 Not Found)${NC}"
  echo -e "${GREEN}✓ In-memory lifecycle behavior successfully validated!${NC}"
else
  echo -e "${RED}FAIL: Expected HTTP 404 Not Found after container reboot, got ${POST_CODE}${NC}"
  exit 1
fi

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  All Forgetting Test assertions PASSED!              ${NC}"
echo -e "${BLUE}======================================================${NC}"
