const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name="firstname"]');
    let lastNameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name="description"]');

    let massageDOM = document.getElementById('massage');
    try {
        let interest = '';
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value;
        if (i < interestDOMs.length - 1) {
            interest += ','
        }
    }

    let userData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interests: interest
    }

        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('response: ', response);
        massageDOM.innerText = 'บันทึกข้อมูลสำเร็จ!';
        massageDOM.className = 'message success';

    } catch (error) {
        if (error.response) {
            console.log('Error', error);
        }
        massageDOM.innerText = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        massageDOM.className = 'message danger';

    }
    console.log('submitData ', userData);
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

