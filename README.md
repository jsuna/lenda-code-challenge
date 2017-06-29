## Lenda Code Challenge

### Run Challenge
- clone repository
```
cd ~/Desktop
git clone https://github.com/jsuna/lenda-code-challenge.git
```
- cd into the cloned repo's directory
```
cd lenda-code-challenge
# install dependancies
npm install

# Build/run the app
npm run build

# serve using python
cd build
python -m SimpleHTTPServer 3000

# serve using npm
npm install -g serve
serve -s build
