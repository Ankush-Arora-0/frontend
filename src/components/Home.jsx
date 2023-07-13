import React, { useEffect, useState } from 'react'
import "../style/Home.css";
import m1 from "../images/mix1.jpg"
import m2 from "../images/mix2.jpg"
import m3 from "../images/mix3.jpg"
import w1 from "../images/sum1.jpg";
import w2 from "../images/sum2.jpg";
import w3 from "../images/sum3.jpg";
import w4 from "../images/sum4.jpg";
import { Card } from './Card';
import { Button } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { LoadingAni } from './LoadingAni';


export const Home = (props) => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [posit, setPosit] = useState("0px");
    const [popScale, setPopscale] = useState("scale(0.01)");
    const [posit1, setPosit1] = useState("0px");
    const [popScale1, setPopscale1] = useState("scale(0.01)");
    const [categ, setCateg] = useState("");
    const [pris, setPris] = useState();
    const [homeData, setHomedata] = useState([])
    const [updhed, setUpdhed] = useState("All products")
    const [animateLine, setAnimateLine] = useState(false);
    const [animateLine1, setAnimateLine1] = useState(false);

    const popStyle = () => {
        var scrollPosition = window.scrollY;
        // alert("hello")
        setPosit(scrollPosition + 50 + "px");
        setPopscale("scale(1)");
        setAnimateLine(true);
      
    }
    const popStyle2 = () => {
        setPosit("0px");
        setPopscale("scale(0.01)");
        setAnimateLine(false);
      
    }
    const popStyle3 = () => {
        var scrollPosition = window.scrollY;
        // alert("hello")
        setPosit1(scrollPosition + 50 + "px");
        setPopscale1("scale(1)");
        setAnimateLine1(true);
       
    }
    const popStyle4 = () => {
        setPosit1("0px");
        setPopscale1("scale(0.01)");
        setAnimateLine1(false);
      
    }

    const HomeData = async () => {
        try {
            const res = await fetch('https://ecommerce-bac.onrender.com/home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
            );
            const data = await res.json();
            if (res.status === 401) {
                props.dispatch({ type: "User", payload: false });
            }
            setHomedata(data);
          
        } catch (err) {
           
        }
    }



    const nex = () => {
        try {
            setCounter1(prevCounter => {
                if (prevCounter === 2) {
                    return 0;
                } else if (prevCounter === 1) {
                    return 2;
                } else {
                    return 1;
                }
            });
            setCounter2(prevCounter => {
                if (prevCounter === 3) {
                    return 0;
                } else if (prevCounter === 2) {
                    return 3;
                }
                else if (prevCounter === 1) {
                    return 2;
                } else {
                    return 1;
                }
            });
        }
        catch (err) {
           
        }
    }
    useEffect(() => {
        const interval = setInterval(nex, 3000);
        HomeData();
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
       
        setCateg(val);
        if (pris === "") {
            HomeData().then(() => {
                setHomedata((oldItems) => {
                    return oldItems.filter((value) => {
                       
                        return value.categ === val;
                    })
                })
            }).catch((res) => {  })
        }
        else {
            HomeData().then(() => {
                setHomedata((oldItems) => {
                    if (pris <= 100) {
                        return oldItems.filter((value) => {
                        
                            return value.price < pris && value.categ === val;
                        })
                    }
                    else {
                        return oldItems.filter((value) => {
                           
                            return ((value.price > 100 || value.price < 100) && value.categ === val);
                        })
                    }
                })
            }).catch((res) => {  })
        }
        setUpdhed(val)
        //setting the value from radio button
    }
    const srchfilter = () => {
        HomeData().then(() => {
            if (props.state === 0 || props.state === '') {
                return null;
            }
            else {

                setHomedata((oldItems) => {
                    return oldItems.filter((val) => {
                        return val.categ === props.state;
                    })
                })
            }
        })
    }
    useEffect(() => {
        srchfilter();
    }, props.state)
    const handleChange2 = (e) => {
        const val = e.target.value;
        setPris(val);
        if (categ === "") {
            HomeData().then(() => {
                setHomedata((oldItems) => {
                    if (val <= 100) {
                        return oldItems.filter((value) => {
                          
                            return value.price < val;
                        })
                    }
                    else {
                        return oldItems.filter((value) => {
                         
                            return value.price > 100 || value.price < 100;
                        })
                    }
                })
            }).catch((res) => { })
        }
        else {
            HomeData().then(() => {
                setHomedata((oldItems) => {
                    if (val <= 100) {
                        return oldItems.filter((value) => {
                           
                            return value.price < val && value.categ === categ;
                        })
                    }
                    else {
                        return oldItems.filter((value) => {
                           
                            return ((value.price > 100 || value.price < 100) && value.categ === categ);
                        })
                    }
                })
            }).catch((res) => { })
        } //setting the value from radio button
    }

    return (<div className="maincont">
        <div className='container'>
            <div className="lft_anbox">
                <div className="lft_subox">
                    <img src={m1} alt="sorry" className="men_im" id='mn_1' style={{ transform: `translateX(-${counter1 * 100}%)` }} />
                    <img src={m2} alt="sorry" className="men_im" id='mn_2' style={{ transform: `translateX(-${counter1 * 100}%)` }} />
                    <img src={m3} alt="sorry" className="men_im" id='mn_3' style={{ transform: `translateX(-${counter1 * 100}%)` }} />
                </div>
                <div className="p_det">
                    <h3>Hurry Up</h3>
                    <p>Sale is on</p>
                    <p>25/06/2023</p>
                </div>
            </div>
            <div className="rgt_anbox">
                <img src={w1} alt="sorry" className="wm_im" id='wm1' style={{ transform: `translateX(-${counter2 * 100}%)` }} />
                <img src={w2} alt="sorry" className="wm_im" id='wm2' style={{ transform: `translateX(-${counter2 * 100}%)` }} />
                <img src={w3} alt="sorry" className="wm_im" id='wm3' style={{ transform: `translateX(-${counter2 * 100}%)` }} />
                <img src={w4} alt="sorry" className="wm_im" id='wm4' style={{ transform: `translateX(-${counter2 * 100}%)` }} />
            </div> </div>
        <div className="content">
            <div className="filter">
                <h1>Filter By Category</h1>
                <form>
                    <div className="filt_div">
                        <input type="radio" value="women" id="Women"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="Women">Women</label></div>
                    <div className="filt_div">
                        <input type="radio" value="men" id="Men"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="Men">Men</label></div>
                    <div className="filt_div">
                        <input type="radio" value="smart watches" id="smartwatches"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="smartwatches">smart watches</label></div>
                    <div className="filt_div">
                        <input type="radio" value="wall clocks" id="wallclocks"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="wallclocks">wall clocks</label></div>
                    <div className="filt_div">
                        <input type="radio" value="stopwatches" id="stopwatches"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="stopwatches">stopwatches</label></div>
                    <div className="filt_div">
                        <input type="radio" value="alarm clocks" id="alarmclocks"
                            onChange={handleChange} name="filt" className="filt_inp" />
                        <label htmlFor="alarmclocks">alarm clocks</label></div>
                </form>
                <h1>Filter By Price</h1>
                <form>    <div className="filt_div">
                    <input type="radio" value={20} id="$0"
                        onChange={handleChange2} name="filtp" className="filt_inp" />
                    <label htmlFor="$0">$0 to 19</label></div>
                    <div className="filt_div">
                        <input type="radio" value={40} id="$20"
                            onChange={handleChange2} name="filtp" className="filt_inp" />
                        <label htmlFor="$20">$20 to 39</label></div>
                    <div className="filt_div">
                        <input type="radio" value={60} id="$40"
                            onChange={handleChange2} name="filtp" className="filt_inp" />
                        <label htmlFor="$40">$40 to 59</label></div>
                    <div className="filt_div">
                        <input type="radio" value={80} id="wallc$60l$60ocks"
                            onChange={handleChange2} name="filtp" className="filt_inp" />
                        <label htmlFor="$60">$60 to 79</label></div>
                    <div className="filt_div">
                        <input type="radio" value={100} id="$80"
                            onChange={handleChange2} name="filtp" className="filt_inp" />
                        <label htmlFor="$80">$80 to 99</label></div>
                    <div className="filt_div">
                        <input type="radio" value={101} id="$100"
                            onChange={handleChange2} name="filtp" className="filt_inp" />
                        <label htmlFor="$100">$100 or more</label></div>
                </form>
                <Button variant="contained" className='filt_rst' onClick={() => { window.location.reload() }}>Reset Filters</Button>
            </div>

            <div className="products">
                <h1>{updhed}</h1>
                <div className="all_product">
                    {homeData.toString() === "" ? <LoadingAni></LoadingAni> : homeData.map((val, index) => {
                        return (<Card img={val.img} name={val.name} price={val.price} descrip={val.description} popStyle={popStyle} popStyle2={popStyle2} popStyle3={popStyle3} popStyle4={popStyle4}></Card>)
                    })}

                </div>
            </div>
        </div>
        <div className="pop_up" style={{ top: posit, transform: popScale, transition: "all 0.5s linear" }}>
            <CheckRoundedIcon style={{ color: "white", backgroundColor: "green", borderRadius: "30px", width: "30px", height: "30px", margin: "3px 5px" }}></CheckRoundedIcon>
            <span> Item added to cart</span>
            <div className={`line ${animateLine ? "animate-line" : ""}`} style={{ borderTop: '5px solid green' }}></div>
        </div>
        <div className="pop_up" style={{ top: posit1, transform: popScale1, transition: "all 0.5s linear" }}>
            <CheckRoundedIcon style={{ color: "white", backgroundColor: "green", borderRadius: "30px", width: "30px", height: "30px", margin: "3px 5px" }}></CheckRoundedIcon>
            <span> Item already in cart</span>
            <div className={`line ${animateLine1 ? "animate-line" : ""}`} style={{ borderTop: '5px solid green' }}></div>
        </div>
    </div>
    )
}
