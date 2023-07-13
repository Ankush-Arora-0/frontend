import React, { useState } from 'react';
import "../style/AdminAdd.css";
import Button from '@mui/material/Button';

export const AdminAdd = () => {
    const convertBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }
    const[inpData,setInpdata]=useState({
        pname:"",
        pprice:"",
        pdesc:"",
        pcateg:""

    });
    const[imgFile,setImgfile]=useState({img:""});

    const changImg=async(e)=>{
        const file=e.target.files[0];
        const base64 = await convertBase64(file);
        setImgfile(()=>{
            return{
                img:base64
            }
        })
      
    }
    const inpVal=(e)=>{
        const name = e.target.name;
        const val = e.target.value;

        setInpdata((oldItems)=>{
            if(name==='prodname'){
                return{
                    pname:val,
                    pprice:oldItems.pprice,
                    pdesc:oldItems.pdesc,
                    pcateg:oldItems.pcateg
                }
            }
            else if(name==='prodprice'){
                return{
                    pname:oldItems.pname,
                    pprice:val,
                    pdesc:oldItems.pdesc,
                    pcateg:oldItems.pcateg
                }
            }
            else if(name==='proddesc'){
                return{
                    pname:oldItems.pname,
                    pprice:oldItems.pprice,
                    pdesc:val,
                    pcateg:oldItems.pcateg
                }
            }
            else if(name==='prodcateg'){
                return{
                    pname:oldItems.pname,
                    pprice:oldItems.pprice,
                    pdesc:oldItems.pdesc,
                    pcateg:val
                }
            }
        })

    }
    const addData=async()=>{
        const {pname,pprice,pdesc,pcateg} = inpData;
        
        const {img}= imgFile;
       
        const res = await fetch('https://ecommerce-bac.onrender.com/admin/crtprod',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
  
      },
      credentials:"include",
      body:JSON.stringify({img:img,name:pname,price:pprice,description:pdesc,categ:pcateg})
  
  });
  
    const data =  await res.text();
   

        if(res.status!==201 || !data){
            window.alert("there is a server error");
       
        }
        else{
            window.alert("data saved");
          
            setInpdata(()=>{
              return{  
                pname:"",
                pprice:"",
                pdesc:""
            }
            });
            setImgfile(()=>{
                return{
                    img:""
                }
            })
        }
    }
    const addProdSub=(e)=>{
        e.preventDefault();
        addData();
    }

  return (
    <div className='add_prod_bdy'>
        <form  method="post" onSubmit={addProdSub}>
            <input type="file" name="prodimg" accept='.jpeg, .png, .jpg' id="prodimg"  onChange={changImg} />
            <div className="prod_detail">
            <label htmlFor="prodname">Name of Product</label>
            <input type="text" name='prodname' id='prodname' className="prod_inp"   value={inpData.pname} onChange={inpVal}/>
            </div>
            <div className="prod_detail">
            <label htmlFor="prodprice">Price of Product</label>
            <input type="text" name='prodprice' id='prodprice' className="prod_inp"  value={inpData.pprice} onChange={inpVal} />
            </div>
            <div className="prod_detail">
            <label htmlFor="prodcateg">Category</label>
            <select name="prodcateg" id="prodcateg" onChange={inpVal}>
                <option value="women" className='prod_option'>Women</option>
                <option value="men" className='prod_option'>men</option>
                <option value="smart watches" className='prod_option'>smart watches</option>
                <option value="wall clocks" className='prod_option'>wall clocks</option>
                <option value="alarm clocks" className='prod_option'>alarm clocks</option>
                <option value="stopwatch" className='prod_option'>stopwatch</option>
            </select>
            </div>
            <div className="prod_detail">
            <label htmlFor="proddesc">Description</label>
            <textarea name="proddesc" id="proddesc" className="prod_inp" value={inpData.pdesc} onChange={inpVal} ></textarea>
            </div>
            <Button variant="contained" id='upl_prod_btn' type='submit'>Upload</Button>
        </form>
    </div>
  )
}
