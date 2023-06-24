#!/bin/bash

#output="[ { \"projects\": [] } ]"
#$(npx nx print-affected --type=app --base=HEAD~1)

# if [[
#    projects=$(echo "$output" | jq -r '.[].projects')
#    services=$(echo "$projects" | jq -r '.[]')
#    json=$(echo "$services" | jq -nR '[inputs | { name: ., tag: "stable", image: "europe-west9-docker.pkg.dev/harmony-383520/harmony/harmony-\(.)" }]')
#    echo "$json"
# else
#    echo "[]"
# fi

#!/bin/bash

output=$(npx nx print-affected --type=app --base=HEAD~5)
services=$(echo "$output" | jq '.projects')

echo "$services" | jq -r -c .




