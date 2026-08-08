# start the development build
cd portfolio
npm start

# push the production react app to the github repository
npm run deploy 

# push the react app source to the github repository
git add .
git commit -m "Add React portfolio source"
git push origin main