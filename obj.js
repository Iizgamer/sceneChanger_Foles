const image = document.getElementById('image');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const buttonsDiv = document.getElementById('buttons');
let audio = new Audio(); // vanilla JS constructor which a new HTMLAudioElement

class Scene {
    constructor(imagePath, text1, text2) {
        this.imagePath = imagePath;
        this.text1 = text1;
        this.text2 = text2;
        this.children = [];
    }

    // adds child nodes to the scene
    setChildren(children) {
        this.children = children;
    }

    // clear all buttons on the scene
    loadChildrenButtons() {
        buttonsDiv.innerHTML = "";
        for (let i = 0; i < this.children.length; i++){
            let newButton = document.createElement('button');
            newButton.innerText = `Option ${i+1}`;

            // call exit scene first
            newButton.addEventListener('click', () => this.exitScene());

            // because of annoying JS weirdness, you can't simply pass this.children[i].renderScene
            // need to use an arrow function here so the reference to "this" is not lost.
            newButton.addEventListener('click', () => this.children[i].renderScene());

            buttonsDiv.appendChild(newButton);
        }
    }

    // render this scene on the screen
    renderScene() {
        image.src = this.imagePath;
        text1.innerText = this.text1;
        text2.innerText = this.text2;

        this.loadChildrenButtons();
    }

    // called once when a new button is clicked
    exitScene(){
        // falling. dreaming. talking. in your sleep. i know you wanna cry all nighhhhhhhhhht.
    }
}

class MusicScene extends Scene {
    constructor(imagePath, text1, text2, audioPath){
        super(imagePath, text1, text2);
        this.audioPath = audioPath;
    }
    renderScene() {
        super.renderScene();
        audio.src = this.audioPath;
        audio.play();
    }
    exitScene() {
        audio.pause();
    }
}

let rootScene = new Scene("./image1.webp", "bomboclat", 'whats up world');
let choiceA = new MusicScene('./image2.jpg', 'wowzers', 'yo', './Dreamy_20Flashback.mp3');
let choiceB = new MusicScene('./image3.jpg', 'bowsers', 'Hello joyous world! It is my utmost pleasure to meet thou!', './Investigations.mp3');

// add child nodes
rootScene.setChildren([choiceA, choiceB]);
choiceA.setChildren([rootScene, choiceB]);
choiceB.setChildren([choiceA, rootScene]);


rootScene.renderScene();