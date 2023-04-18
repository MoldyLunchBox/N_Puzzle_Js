# Define variables
NODE = npm run dev

# Define targets
.PHONY: all clean

# Build target
all:
    $(NODE)

# Clean target
clean:
    rm $(OUT)