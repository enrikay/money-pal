
/** 
Generates ID of either number, alphabets or mixture... Default is `Number` 

* 6 is default length

Can generate add alphbet to id string by specifying param `useLetter` to `true`

Can also choose the position of the alphabets in the string by specifying param `letterPosition` to either `start`  `center` or `end` , default is `start`
*/
export function GenerateCustomID(length = 6, useLetter = false, letterPosition: 'start' | 'center' | 'end' = 'start') {
    return new Promise<string>((resolve, reject) => {
  
      try {
  
        let lengtth = length - 2;
        const timestamp = +new Date();
        const alphabets = 'abcdefghjkmnpqrstuwxyz';
        const characters = '23456789';
        const charactersLength = characters.length;
        const ts = timestamp.toString();
        const parts = ts.split('').reverse();
  
        let id = '';
        let initial = '';
        let result = '';
  
        if (useLetter === true) {
          lengtth = lengtth - 2;
        }
  
        const getRandomInt = (min: number, max: number) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
  
        for (let i = 0; i < lengtth; ++i) {
          const index = getRandomInt(0, parts.length - 1);
          id += parts[index];
        }
  
        for (let i = 0; i < 2; i++) {
          initial += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
  
        if (useLetter === true) {
          let alpha = ``;
  
          for (let i = 0; i < 2; i++) {
            alpha += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
          }
  
          if (letterPosition === `end`) {
            result = `${initial}${id}${alpha}`;
            // } else if (letterPosition === `center`) {
            // result = `${initial}${id}`;
          } else {
            result = `${alpha}${initial}${id}`;
          }
  
        } else {
          result = `${initial}${id}`;
        }
  
        resolve(result);
      } catch (error) {
        reject(error)
      }
  
    });
  }
  