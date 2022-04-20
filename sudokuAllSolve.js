const fs = require('fs');

const start = fs.readFileSync('./sudoku-puzzles.txt', 'utf8');

function arraysInArr(start, number) {
  let resultArr = start.split('\n');
  let stringsArr = [];
for (let i = 9; i <= resultArr[number].length; i += 9) {
  stringsArr.push(resultArr[number].slice(i - 9, i));
}

const numsArrays = stringsArr.map(function (num) {
  return num.split('');
})
return numsArrays;
}

function numberOrNan (numb) {
const baseArray = arraysInArr(start, numb);
let numbersArr = [];
for (let elem of baseArray){
  const temporaryArr = [];
    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i] === '-'){
        temporaryArr.push('.');
      } else {
        temporaryArr.push(elem[i]);
      }
    }
    numbersArr.push(temporaryArr);
}
return numbersArr;
}
let solveSudoku = function(board) {
  const sizeFull = 9;
  const sizeQu = 3;

  const emptyFinder = (board) => {
      for (let r = 0; r < sizeFull; r++) { //по строке
          for (let c = 0; c < sizeFull; c++) { // по колонке
              if(board[r][c] === '.') { //если колонка и строка текущие пустые, то
                  return [r,c]; // возвращаем массив с текущей строкой и колонкой
              }
          }
      }
      return null; // если нету свободных колонок(solved)
  }

  const validate = (num, pos, board) => {
      const [r,c] = pos; //получаем r & c из pos с помощью деструктуризации

      //проверка строки если элемент, который хранится в этой позиции равен числу, то возвращаем фолс
      for (let i = 0; i < sizeFull; i++) {
          if (board[i][c] === num && i !== r) { // проверяем текущее число, то есть i != r, если число встретилось в колонке, то возвращаем фолс - проверка не проходит, тогда начинаем проверять другое число, пока не подойдет
              return false;
          }
      }

      //проверка колонки 
      for (let i = 0; i < sizeFull; i++) {
          if (board[r][i] === num && i !== c) { // проверяем текущее число, то есть i != c, если число встретилось в колонке, то возвращаем фолс - проверка не проходит
              return false;
          }
      }


      //проверяем фул квардрат
      const quRow = Math.floor( r/sizeQu ) * sizeQu; // находим индекс в строке((6/3) * 3) = 6 - индекс строки 6
      const quCol = Math.floor( c/sizeQu ) * sizeQu; //находим индекс в колонке
      // 2 константы проверяют где начинается сектор квадрата
      for (let i = quRow; i < quRow + sizeQu; i++) {
          for (let j = quCol; j < quCol + sizeQu; j++) {
              if (board[i][j] === num && i !== r && j !== c) { // если у нас есть число, которое встретилось в квадрате, то проверка не проходит
                  return false;
              }
          }
      }

      return true;
  }

  const solve = () => {
    const currentPos = emptyFinder(board);

    if (currentPos === null) {
        return true;
    }
   // console.log('SADSADSADSADSADSADSADSADSADSADSADSADSADSAD')
    for (let i = 1; i < sizeFull + 1; i++) {
        const currentNum = i.toString(); // потому что все подставляем потом в строку
        const isValid = validate(currentNum, currentPos, board); //если подставив на текущую позицию текущее число борд не сломается то тру
        if (isValid) {
            const [x,y] = currentPos; // если число с текущей позицией проходит все проверки
            board[x][y] = currentNum; // преобразуем это число к строке - оно подходит

            if(solve()) { // если решится, и все проверки дадут тру, то число подходит
                return true;
            }

            board[x][y] = '.'; // если после какой-то проверки число не состыковывается, ретерним фолс и снова задаем ему пустое значение и идем вверх
        }
    }

    return false;
}

solve();
return board;
};

//console.table(numberOrNan(0));
console.table(solveSudoku(numberOrNan(14)));
// start - node sudokuAllSolve.js
