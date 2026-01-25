function submitData() {
    // ดึงค่าจาก input ชื่อ-นามสกุล-อายุ
    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const age = document.querySelector('input[name="age"]').value;
    
    // ดึงค่าเพศ (Radio)
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const gender = genderElement ? genderElement.value : 'ไม่ได้ระบุ';

    // ดึงค่างานอดิเรก (Checkbox)
    const interests = [];
    const interestElements = document.querySelectorAll('input[name="interest"]:checked');
    interestElements.forEach((item) => {
        interests.push(item.value);
    });

    // ดึงคำอธิบาย
    const description = document.querySelector('textarea[name="description"]').value;

    // ตรวจสอบค่าว่างเบื้องต้น
    if (!firstname || !lastname) {
        alert("กรุณากรอกชื่อและนามสกุลด้วยครับ");
        return;
    }

    // แสดงผลข้อมูลที่รวบรวมได้
    console.log("--- ข้อมูลการลงทะเบียน ---");
    console.log(`ชื่อ-นามสกุล: ${firstname} ${lastname}`);
    console.log(`อายุ: ${age}`);
    console.log(`เพศ: ${gender}`);
    console.log(`งานอดิเรก: ${interests.join(', ')}`);
    console.log(`รายละเอียด: ${description}`);
    
    alert("ส่งข้อมูลสำเร็จ! (เช็คผลลัพธ์ที่ Console)");
}