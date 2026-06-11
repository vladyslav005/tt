#!/bin/bash
antlr4 -Dlanguage=TypeScript -visitor ./src/shared/core/antlr/Lambda.g4


for file in ./src/shared/core/antlr/*.ts; do
  sed -i '1s/^/\/\/ @ts-nocheck\n/' "$file";
done
