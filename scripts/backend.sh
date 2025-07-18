#!bin/bash
docker stop backend || true
docker run --name backend -p 3001:3001 whispernet/monolithic-backend