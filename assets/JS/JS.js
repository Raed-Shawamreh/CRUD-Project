var course_name = document.getElementById("course_name");
var course_category=document.getElementById("course_category");
var course_price = document.getElementById("course_price");
var btn_addCourse=document.getElementById("btn_addCourse")
var add_record = document.getElementById("add_record");
var btn_Delete=document.getElementById("btn_Delete");
var update_record= document.getElementById("update_record")
var delete_record= document.getElementById("delete_record")
var search= document.getElementById("search")
var rows=" ";
var obj_course;
var updated_cousre; 
var updt_index=0;
var isNameValid = false;
var isCategoryValid = false;
var isPriceValid = false;

btn_updateCourse.style.display="none";

var array_course=JSON.parse(localStorage.getItem("courses")) ;
if(array_course==null)
array_course=[];
else
read();
chechInput();

function chechInput(){
  if(isNameValid && isCategoryValid && isPriceValid){
  btn_addCourse.removeAttribute('disabled');
  }
  else{
    btn_addCourse.setAttribute('disabled','disabled')

}
  
  
}

  // create____________
btn_addCourse.onclick = function(e){

      e.preventDefault();
      create_Course();
      resetInput();
      read();
  }


function create_Course(){
       obj_course ={
        courseName: course_name.value,
        courseCategory: course_category.value,
        coursePrice: course_price.value
    }
    array_course.push(obj_course);
    localStorage.setItem("courses", JSON.stringify(array_course))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved ',
        showConfirmButton: false,
        timer: 1500
      })
      btn_addCourse.setAttribute('disabled','disabled')
}
//________________reset_________________________
function resetInput(){
  course_name.value='';
  course_category.value='';
  course_price.value='';
  course_name.classList.remove('is-valid');
  course_category.classList.remove('is-valid');
  course_price.classList.remove('is-valid');
}


//__________________read___________________________
function read(){
    rows=" ";
    for (let i = 0; i < array_course.length; i++) {
        rows+=`
        <tr>
          <th scope="row">${i+1}</th>
          <td>${array_course[i].courseName}</td>
          <td>${array_course[i].courseCategory}</td>
          <td>${array_course[i].coursePrice}</td>
          <td><button class="btn btn-info" onclick="getData(${i})">Update</button> </td>
          <td><button class="btn btn-danger" onclick="del1(${i})">Delete</button> </td>
        </tr>`
    }
    add_record.innerHTML=rows;
}

//______________________delete___________________________
function del1(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            array_course.splice(index,1)
            localStorage.setItem("courses", JSON.stringify(array_course))
            read();   
          Swal.fire(
            'Deleted!',
            'Your record has been deleted.',
            'success'
          )
        }
      })
}
//___delete  all record
btn_Delete.onclick= function()
    {   
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
      array_course=[];
      localStorage.setItem("courses", JSON.stringify(array_course))
      add_record.innerHTML=" ";
      Swal.fire(
        'Deleted!',
        'Your record has been deleted.',
        'success'
      )
    }
  })

 }

//______________________search___________________________

    search.onkeyup= function(){
        rows=" ";
        for(let i=0 ; i<array_course.length;i++)
        {
            if(array_course[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
            {
                    rows+=`
                    <tr>
                      <th scope="row">${i+1}</th>
                      <td>${array_course[i].courseName}</td>
                      <td>${array_course[i].courseCategory}</td>
                      <td>${array_course[i].coursePrice}</td>
                      <td><button class="btn btn-info" onclick="getData(${i})">Update</button> </td>
                      <td><button class="btn btn-danger" onclick="del1(${i})">Delete</button> </td>
                    </tr>`
                }
            }

            add_record.innerHTML=rows;
        }

//______________________Update___________________________
function getData(index){
  updt_index=index;
  console.log(index);
  console.log(array_course[index])
  course_name.value=array_course[index].courseName;
  course_category.value=array_course[index].courseCategory;
  course_price.value=array_course[index].coursePrice;

  btn_addCourse.style.display='none';
  btn_updateCourse.style.display='inline';
}

btn_updateCourse.onclick= function(e){

  e.preventDefault();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: ` ${array_course[updt_index].courseName} updated successfully`,
    showConfirmButton: false,
    timer: 2000
  })
  array_course[updt_index].courseName =course_name.value;
  array_course[updt_index].courseCategory=course_category.value;
  array_course[updt_index].coursePrice=course_price.value;
  localStorage.setItem("courses", JSON.stringify(array_course))
  btn_addCourse.style.display='inline';
  btn_updateCourse.style.display='none';
  resetInput();
  read();
  btn_addCourse.setAttribute('disabled','disabled')
}


//______________________Regex___________________________
/**
 * Regex course name 
 * name
 * First Cap
 * no num
 * 3-10 length
 */
var courseName_alert=document.getElementById("courseName_alert")

course_name.onkeyup=function(){
  var pattern = /[A-Z][a-z]{2,9}$/

  if(pattern.test(course_name.value)){
    isNameValid=true;
    courseName_alert.style.display='none'

    if(course_name.classList.contains('is-invalid'))
    {
      course_name.classList.replace('is-invalid','is-valid') 
    }
    course_name.classList.add('is-valid') 
    
  }
    else{
    isNameValid=false;
    courseName_alert.style.display='block'
    courseName_alert.innerHTML='please enter a 3 or more letters starts with capital with length 10 or less'
    if(course_name.classList.contains('is-valid')){
      course_name.classList.replace('is-valid','is-invalid')
    }
  course_name.classList.add('is-invalid')}
  

    chechInput();
}

/**
 * Regex course category  
 * name
 * First Cap
 * no number 
 * 3-20 length
 *  */
 var courseCategory_alert=document.getElementById("courseCategory_alert")

 course_category.onkeyup=function(){
  var pattern = /[A-Z][a-z]{2,19}$/

  if(pattern.test(course_category.value)){
    isCategoryValid=true;
    courseCategory_alert.style.display='none'
    if(course_category.classList.contains('is-invalid'))
    {
      course_category.classList.replace('is-invalid','is-valid') 
    }
    course_category.classList.add('is-valid') 
    
  }
    else{
    isCategoryValid=false;
    courseCategory_alert.style.display='block'
    courseCategory_alert.innerHTML='please enter a 3 or more letters starts with capital with length 20 or less'

    if(course_category.classList.contains('is-valid')){
      course_category.classList.replace('is-valid','is-invalid')
    }
  course_category.classList.add('is-invalid')}
  
    chechInput();
}

/**
 * Regex course price 
 * number
 * 3-4 length
 *  */
 var coursePrice_alert=document.getElementById("coursePrice_alert")

 course_price.onkeyup=function(){
  var pattern =/^[0-9]{3,4}$/gm

  if(pattern.test(course_price.value) && course_price.value>=100){
    isPriceValid=true;
    coursePrice_alert.style.display='none'

    if(course_price.classList.contains('is-invalid'))
    {
      course_price.classList.replace('is-invalid','is-valid') 
    }
    course_price.classList.add('is-valid') 
    
  }
    else{
    isPriceValid=false;
    coursePrice_alert.style.display='block'
    coursePrice_alert.innerHTML='please enter a number between 100 to 9999 '

    if(course_price.classList.contains('is-valid')){
      course_price.classList.replace('is-valid','is-invalid')
    }
  course_price.classList.add('is-invalid')}
  
    chechInput();
}

