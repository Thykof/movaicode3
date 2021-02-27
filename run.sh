rm build/contracts/MovaiCode.json
npm i
npx ganache-cli -m "can flip ocean logic case muffin expose ice truly correct brand budget" > /dev/null &
echo $!
npx truffle deploy
node main.js
kill -9 $!
