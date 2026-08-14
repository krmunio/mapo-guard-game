#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source_dir="${project_dir}/examples/completed"
files=(index.html style.css script.js)

for file in "${files[@]}"; do
  source_path="${source_dir}/${file}"

  if [[ ! -f "${source_path}" ]]; then
    printf '초기화 원본 파일을 찾을 수 없습니다: %s\n' "${source_path}" >&2
    exit 1
  fi
done

cp -- "${files[@]/#/${source_dir}/}" "${project_dir}/"
printf '게임을 다음 참가자를 위한 시작 상태로 초기화했습니다.\n'
