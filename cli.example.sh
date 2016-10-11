# Delete previous created directories
# rm -rf ./public

# Show help
# php ../rockjs/cli

# Create new "source" application
# php ../rockjs/cli app ./source

# Create new "myLayoutName" layout
# php ../rockjs/cli layout ./source/layouts/myLayoutName

# Create new "myModuleName" module
# php ../rockjs/cli module ./source/modules/myModuleName

# Compile "source" application static bundle to "public" directory for deployment
# php ../rockjs/cli deploy -s ./source -d ./public -m html,css,js