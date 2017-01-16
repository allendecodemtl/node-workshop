function printing(){
    console.log("Hello World!")
    setTimeout(printing, 1000);
}

printing();