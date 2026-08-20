#!/bin/bash
antlr4 -Dlanguage=TypeScript -visitor ./src/antlr/Lambda.g4


for file in ./src/antlr/*.ts; do
  sed -i '1s/^/\/\/ @ts-nocheck\n/' "$file";
done
