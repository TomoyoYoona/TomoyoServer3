
const download=(file,id)=>{
    window.open(`/api/PCA/getFile?f=${file}&id=${id}`);

}
const submit=()=>{

}
// const upload = () => {

//     const formData = new FormData(document.querySelector('#form1'));
//     // formData.append('file', file);
//     console.log(formData);
  
//     return fetch({
//       method: 'post',
//       body: formData,
//     })
//   }


$().ready(()=>{
    // $('form1').ajaxForm((data)=>{
    //     console.log(data);
    //     console.log(JSON.stringify(data));
    // })
})


const test=()=>{
    var form=new FormData(document.getElementById('form1'));
    console.log(form);
    $.ajax({
        url:"/api/PCA/postFile",
        type:"post",
        data:form,
        processData:false,
        contentType:false,
        success:postFileComplete,
        error:()=>{
            console.log('错误')
        }

    })
}

const postFileComplete=(data)=>{
    console.log(data);
    alert('数据处理成功')
    $('#feedbackFile').append(`
        此处下载结果文件：
        <p>pca.xlsx</p><button onclick="download('pca_test',1)">下载</button>
        <p>plsr.xlsx</p><button onclick="download('plsr_test',1)">下载</button>
    `)
}