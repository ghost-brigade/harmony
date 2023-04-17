lint:
	@echo "Linting every apps..."
	@npx nx run-many --targets=lint --parallel
	@echo "Everything linted."

test:
	@echo "Testing every apps..."
	@npx nx run-many --targets=test --parallel
	@echo "Everything tested."

app:
	@echo "Creating a lib..."
	@npx nx g app
	@echo "Lib created"

lib:
	@echo "Creating a lib..."
	@npx nx g lib
	@echo "Lib created"
