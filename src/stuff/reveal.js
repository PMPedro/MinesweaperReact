export const revealed = (arr, x, y, newNonMinesCount) => {
    //recebe a posicao onde foi clicado (x e y), o tabuleiro (arr)
    console.log(arr[x][y]);
    if (arr[x][y].revealed) { // se a celula ja estiver clicada, apenas e devolvido o tabuleiro 
  
      return;
    }
  
    //ele continua a virar cartas, ate que o seu valor seja diferente de 0 
    //basicamente, da flip a todos as celulas com 0s adjacentes
    let flipped = [];
    flipped.push(arr[x][y]);
    while (flipped.length !== 0) {
      let single = flipped.pop();
  
      if (!single.revealed) {
        newNonMinesCount--;
        single.revealed = true;
      }
  
      //caso a carta revelada seja diferente de 0, ele para
      if (single.value !== 0) {
        break;
      }
  

      //estes ifs e quando a carta revelada é um zero 
      //Top - Left
      if (
        single.x > 0 &&
        single.y > 0 &&
        arr[single.x - 1][single.y - 1].value === 0 &&
        !arr[single.x - 1][single.y - 1].revealed
      ) {
        flipped.push(arr[single.x - 1][single.y - 1]);
      }
  
      // Bottom - Right
      if (
        single.x < arr.length - 1 &&
        single.y < arr[0].length - 1 &&
        arr[single.x + 1][single.y + 1].value === 0 &&
        !arr[single.x + 1][single.y + 1].revealed
      ) {
        flipped.push(arr[single.x + 1][single.y + 1]);
      }
  
      // Bottom - Left
      if (
        single.x < arr.length - 1 &&
        single.y > 0 &&
        arr[single.x + 1][single.y - 1].value === 0 &&
        !arr[single.x + 1][single.y - 1].revealed
      ) {
        flipped.push(arr[single.x + 1][single.y - 1]);
      }
  
      // Top - Right
      if (
        single.x > 0 &&
        single.y < arr[0].length - 1 &&
        arr[single.x - 1][single.y + 1].value === 0 &&
        !arr[single.x - 1][single.y + 1].revealed
      ) {
        flipped.push(arr[single.x - 1][single.y + 1]);
      }
  
      // As das pontas, nao e preciso tantas verificacoes 
  
      // Top
      if (
        single.x > 0 &&
        arr[single.x - 1][single.y].value === 0 &&
        !arr[single.x - 1][single.y].revealed
      ) {
        flipped.push(arr[single.x - 1][single.y]);
      }
  
      // Bottom
      if (
        single.x < arr.length - 1 &&
        arr[single.x + 1][single.y].value === 0 &&
        !arr[single.x + 1][single.y].revealed
      ) {
        flipped.push(arr[single.x + 1][single.y]);
      }
  
      // Left
      if (
        single.y > 0 &&
        arr[single.x][single.y - 1].value === 0 &&
        !arr[single.x][single.y - 1].revealed
      ) {
        flipped.push(arr[single.x][single.y - 1]);
      }
  
      // Right
      if (
        single.y < arr[0].length - 1 &&
        arr[single.x][single.y + 1].value === 0 &&
        !arr[single.x][single.y + 1].revealed
      ) {
        flipped.push(arr[single.x][single.y + 1]);
      }
  
      // Start Revealing Items
      if (
        single.x > 0 &&
        single.y > 0 &&
        !arr[single.x - 1][single.y - 1].revealed
      ) {
        //Top Left Reveal
  
        arr[single.x - 1][single.y - 1].revealed = true;
        newNonMinesCount--;
      }
  
      if (single.y > 0 && !arr[single.x][single.y - 1].revealed) {
        // Left Reveal
        arr[single.x][single.y - 1].revealed = true;
        newNonMinesCount--;
      }
  
      if (
        single.x < arr.length - 1 &&
        single.y > 0 &&
        !arr[single.x + 1][single.y - 1].revealed
      ) {
        //Bottom Left Reveal
        arr[single.x + 1][single.y - 1].revealed = true;
        newNonMinesCount--;
      }
  
      if (single.x > 0 && !arr[single.x - 1][single.y].revealed) {
        //Top Reveal
        arr[single.x - 1][single.y].revealed = true;
        newNonMinesCount--;
      }
  
      if (single.x < arr.length - 1 && !arr[single.x + 1][single.y].revealed) {
        // Bottom Reveal
        arr[single.x + 1][single.y].revealed = true;
        newNonMinesCount--;
      }
  
      if (
        single.x > 0 &&
        single.y < arr[0].length - 1 &&
        !arr[single.x - 1][single.y + 1].revealed
      ) {
        // Top Right Reveal
        arr[single.x - 1][single.y + 1].revealed = true;
        newNonMinesCount--;
      }
  
      if (single.y < arr[0].length - 1 && !arr[single.x][single.y + 1].revealed) {
        //Right Reveal
        arr[single.x][single.y + 1].revealed = true;
        newNonMinesCount--;
      }
  
      if (
        single.x < arr.length - 1 &&
        single.y < arr[0].length - 1 &&
        !arr[single.x + 1][single.y + 1].revealed
      ) {
        // Bottom Right Reveal
        arr[single.x + 1][single.y + 1].revealed = true;
        newNonMinesCount--;
      }
    }
  
    return { arr, newNonMinesCount };
  };