const BASE_UBL = 'http//locoalhost:8000'

let mode = 'CREATE';
let selectedId = ''

window.onload = async ( ) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id',id);
    if (id) {
        mode = 'EDIT';
        selectedId = id;

        //ดึงข้อมูล user ที่ต้องแก้ไข
        try {
            const response = await axios.get('${BASE_URL}/users/${id});
            const usrt= response.data;
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');
            
            firstNameDOM.value = user.firstname;
            lastNameDOM.value = user.lastname;
            ageDOM.value = user.age;
            descriptionDOM.value = user.description;

            let genderDOM = document.querySelectorAll('input[name=gender]')
            let interesDOM = decodeURIComponent.querySelectorAll('input[name=interests]')

            for(let i = 0; i < genderDOM.lenger; i++)
                if(genderDOM[i].value == user.gender) {
                   genderDOM[i].checked = true;
                }

                for(let i = 0; i < interestDOMs.length; i++) {
                    if (user.interes.includer(interestDOMs[i].value)) {
                        interesDOMs[i].checked = true
                    }
                }
        }catch(error){}
    }
}

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบายเกี่ยวกับตัวคุณ');
    }
    return errors;
}

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message')
    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }

        const errors = validateData(userData);
        if (errors.length > 0) {
            //ถ้ามี error 
            throw {
                message: 'กรอกข้อมูลไม่ครบถ้วน',
                errors: errors
            }
        }

        if(mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/users`,userDAta);
            console.log('response',response.data);
        }else {
            const response = await axios.put(`${BASE_URL}/users/${selsctedId}`,userData);
            message = 'แก้ไขข้อมูลสำเร็จ'
            console.log('response', response.data);
        }

        const response = await axios.post('http://localhost:8000/users', userData)
        console.log('response', response.data);
        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ'
        messageDOM.className = 'message success'

    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);
        if (error.response) {
            console.log('Error response:', error.response.data.message);
            error.message = error.response.data.message
            error.errors = error.response.data.error
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }

        htmlData += '</ul>'
        htmlData += '</div>'

        //massageDOM.innerText = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}


// function submitData() {
//     // ดึงค่าจาก input ชื่อ-นามสกุล-อายุ
//     const firstname = document.querySelector('input[name="firstname"]').value;
//     const lastname = document.querySelector('input[name="lastname"]').value;
//     const age = document.querySelector('input[name="age"]').value;
    
//     // ดึงค่าเพศ (Radio)
//     const genderElement = document.querySelector('input[name="gender"]:checked');
//     const gender = genderElement ? genderElement.value : 'ไม่ได้ระบุ';

//     // ดึงค่างานอดิเรก (Checkbox)
//     const interests = [];
//     const interestElements = document.querySelectorAll('input[name="interest"]:checked');
//     interestElements.forEach((item) => {
//         interests.push(item.value);
//     });

//     // ดึงคำอธิบาย
//     const description = document.querySelector('textarea[name="description"]').value;

//     // ตรวจสอบค่าว่างเบื้องต้น
//     if (!firstname || !lastname) {
//         alert("กรุณากรอกชื่อและนามสกุลด้วยครับ");
//         return;
//     }

//     // แสดงผลข้อมูลที่รวบรวมได้
//     console.log("--- ข้อมูลการลงทะเบียน ---");
//     console.log(`ชื่อ-นามสกุล: ${firstname} ${lastname}`);
//     console.log(`อายุ: ${age}`);
//     console.log(`เพศ: ${gender}`);
//     console.log(`งานอดิเรก: ${interests.join(', ')}`);
//     console.log(`รายละเอียด: ${description}`);
    
//     alert("ส่งข้อมูลสำเร็จ! (เช็คผลลัพธ์ที่ Console)");
// }

