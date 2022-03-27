let name;
let age;

function SceneObj(name, age) {
    this.name = name;
    this.age = age;
}

SceneObj.prototype.test = function (){
    return this.age + 1;
}

//SceneObj.prototype.speak = function() {
//    return "I am a dog";z
//}
//let john = new SceneObj("John", 45);
