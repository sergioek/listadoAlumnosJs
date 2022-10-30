const alumnosArray=[
    {
        name:'Sergio',
        lastname:'Khairallah',
        age: 29,
        dni:12345678,
    },

    {
        name:'Camila',
        lastname:'Khairallah',
        age: 26,
        dni:11111111,
    },

    {
        name:'Silvia Viviana',
        lastname:'Khairallah',
        age: 41,
        dni:22222222,
    },

    {
        name:'Jorge',
        lastname:'Khairallah',
        age: 66,
        dni:33333333,
    }
]

class Alumno{
    constructor(name,lastname,age,dni){
        this.name=name;
        this.lastname=lastname;
        this.age=age;
        this.dni=dni;
    }

    listadoAlumnos(){
        return alumnosArray;
    }

    nuevoAlumno(){
        alumnosArray.push(
            {
                name:this.name,
                lastname:this.lastname,
                age:this.age,
                dni:this.dni
            }
        );
    }

    borrarAlumno(index){
        alumnosArray.splice(index,1);
    }

    busquedaAlumnoNombre(texto){
        const busqueda = alumnosArray.filter((alumno => alumno.name.includes(texto)));
        
        return busqueda;
        
    }

    busquedaAlumnoDNI(numero){
        const busquedaDNI = alumnosArray.find((alumno=>alumno.dni === Number(numero)));

        return busquedaDNI;
    }

}

const instanciaAlumno=new Alumno;


const loadArray = (alumnos) =>{
    let table = document.getElementById('table');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let  i =1;

    if(Array.isArray(alumnos)){
        alumnos.forEach((alumno,index) => {
            table.innerHTML+=`
            <tr>
                <td class='text-center'>${i++}</td>
                <td>${alumno.name}</td>
                <td>${alumno.lastname}</td>
                <td class='text-center'>${alumno.age}</td>
                <td class='text-center'>${alumno.dni}</td>
                
                <td class='text-center'>
                    <button onclick='eliminarAlumno(${index})' class='btn btn-danger bi bi-x-circle-fill'>
                    </button>
                </td>
            </tr>
            `;
         });
    }else{
            table.innerHTML+=`
            <tr>
                <td>${1}</td>
                <td>${alumnos.name}</td>
                <td>${alumnos.lastname}</td>
                <td>${alumnos.age}</td>
                <td>${alumnos.dni}</td>
            </tr>
            `;
    }
   
}

const buscar =()=>{
    let valorBusqueda= document.getElementById('buscador').value;
    if(valorBusqueda===''){
        loadArray(instanciaAlumno.listadoAlumnos());
    }else if(Number(valorBusqueda)){
        loadArray(instanciaAlumno.busquedaAlumnoDNI(valorBusqueda));
    }else{
        loadArray(instanciaAlumno.busquedaAlumnoNombre(valorBusqueda));
       
    }
}

const eliminarAlumno = (index)=> {
    instanciaAlumno.borrarAlumno(index);
    loadArray(instanciaAlumno.listadoAlumnos());
}

function validacionTexto(name,lastname){
    let text='El campo no puede estar vacío.';
    let textName = document.getElementById('errorName');
    let textLastName = document.getElementById('errorLastName');
    let val1;
    let val2;
    if(name.length < 2 || name === '' || Number(name)){
        textName.innerHTML=text;
    }else{
        textName.innerHTML='';
        val1=true;
    }

    if(lastname.length < 2 || lastname === '' || Number(lastname)){
        textLastName.innerHTML=text;
    }else{
        textLastName.innerHTML='';
        val2=true;
    }

    if(val1 && val2){
        return true;
    }else{
        return false;
    }

}

function validacionNumero(age,dni){
    let textCampoAge='El campo no puede estar vacío y debe ser un número mayor a dos digitos.';
    let textCampoDNI='El campo no puede estar vacío y debe ser un número de 8 digitos.';
    let textAge = document.getElementById('errorAge');
    let textDNI = document.getElementById('errorDni');
    let val1;
    let val2;
    if(age === '' || !Number(age) || age > 99 ){
        textAge.innerHTML=textCampoAge;
    }else{
        textAge.innerHTML='';
        val1=true;
    }

    if(dni === '' || !Number(dni) || dni.toString().length !==8
    ){
        textDNI.innerHTML=textCampoDNI;
    }else{
        if(alumnosArray.some((alumno =>alumno.dni === dni ))){
            textDNI.innerHTML='El valor ingresado es igual a un DNI existente en el sistema.'
        }else{
            textDNI.innerHTML='';
            val2=true;  
        }
        
    }


    if(val1 && val2){
        return true;
    }else{
        return false;
    }

}
const validaciones = function (){
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value;
    let age = document.getElementById('age').value;
    age = parseInt(age);
    let dni = document.getElementById('dni').value;
    dni = parseInt(dni);
    if(validacionTexto(name,lastname) && validacionNumero(age,dni)){
        let botonGuardar = document.getElementById('botonGuardar');
        botonGuardar.disabled=false;
        return [name, lastname, age, dni];
    }
}

const agregarAlumno = () =>{
    array = validaciones();
    persona = new Alumno(array[0],array[1],array[2],array[3])
    persona.nuevoAlumno();
    loadArray(instanciaAlumno.listadoAlumnos());
    let name = document.getElementById('name').value='';
    let lastname = document.getElementById('lastname').value='';
    let age = document.getElementById('age').value='';
    let dni = document.getElementById('dni').value='';
}


window.addEventListener('load',loadArray(instanciaAlumno.listadoAlumnos()));

let buscador = document.getElementById('buscador');
buscador.addEventListener('change',buscar);

let formulario = document.getElementById('formulario');
formulario.addEventListener('change',validaciones);

botonGuardar.addEventListener('click',agregarAlumno);
