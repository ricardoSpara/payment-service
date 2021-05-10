#!/bin/bash

#On error no such file entrypoint.sh, execute in terminal - dos2unix entrypoint.sh
yarn install
yarn typeorm migration:run
yarn dev
