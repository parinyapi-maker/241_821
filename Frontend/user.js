//1. load user ทั้งหมดจาก  api /user
const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadUsers()
}

const loadData = async () => {

       const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);


//2.นำข้อมูล user ที่ได้มาแสดงในหน้าเว็บ
const userDOM = document.getElementById('user');
let htmlData = '<div>'
for (let i = 0; i < response.data.length; i++) {
    let user = response.data[i];
    htmlData += `<div">
    ${user.firstname} ${user.lastname}
    <button>Edit</button>
    <button class ='delete' data-id='${user.id}'>Delete</button>

    </div>`
}

htmlData += '</div>'
userDOM.innerHTML = htmlData;

const deleteDOMs = document.getElementsByClassName('delete');
for (let i = 0; i < deleteDOMs.length; i++) {
            deleteDOMs[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    //1
                    await axios.delete(`${BASE_URL}/users/${id}`);
                    loadData()
                } catch (error) {
                    console.error(error);
                }
            });
        }
    }