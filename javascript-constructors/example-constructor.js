function ExampleConstructor() {

}
console.log('prototype of Example Constructor', ExampleConstructor.prototype);
console.log('typeof prototype Example Constructor', typeof ExampleConstructor.prototype);

var newVariable = new ExampleConstructor();
console.log('newVariable', newVariable);

var InstanceCheck = newVariable instanceof ExampleConstructor;
console.log('instance check', InstanceCheck);
