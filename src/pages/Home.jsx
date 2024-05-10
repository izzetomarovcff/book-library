import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const { GeneralResponse } = useSelector(state => state)
  return (
    <div className='home'>
      <div className="homecontainer">
        <div className="wellcome">
          <div className="text">
            <h3>Salam Elektron Kitabxanamıza Xoş Gəlmisiniz!</h3>
            <p>Web saytımız vasitəsi ilə onlayn qaydada kitablar əldə edib oxuya bilərsiniz!</p>
            <div className="buttons mt-3">
              {GeneralResponse.is_login ? (<></>) : (<Link to="/signup" className='btn btn-primary me-4'>Qeydiyyatdan Keç</Link>)}
              <Link to="/books" className='btn btn-outline-primary'>Kitablar</Link>
            </div>
          </div>
          <img src="image/1.png" alt="" />
        </div>
        <div className="wellcome">
          <img src="image/2.png" alt="" />
          <div className="text">
            <h3>Bizimlə İnkişaf Et!</h3>
            <p>Web Saytımızdan Həm Elmi Həm də Bədii Kitablar Oxuyaraq Özünüzü İnkişaf etdiə Bilərsiz!</p>
            <div className="buttons mt-3">
              <Link to="/books" className='btn btn-outline-primary'>Özünü İnkişaf Etdir</Link>
            </div>
          </div>
        </div>
        <div className='statistics mb-5'>
          <div className="element">
            <div className="count">120+</div>
            <div className="info-text">Istifadəçi</div>
          </div>
          <div className="element">
            <div className="count">200+</div>
            <div className="info-text">Müəllif</div>
          </div>
          <div className="element">
            <div className="count">500+</div>
            <div className="info-text">Bədii Kitab</div>
          </div>
          <div className="element">
            <div className="count">500+</div>
            <div className="info-text">Elmi Kitab</div>
          </div>
        </div>
        <div className="wellcome">
          <div className="text">
            <h3>Bizi Sosial Şəbəkələrdən İzləyə Bilərsiz</h3>
            <p>Bizi Sosial Şəbəkələrdən İzləyərək Yeniliklərdən Ən Tez Siz Xəbərdar Ola Bilərsiniz!</p>
            <div className="buttons mt-3">
              <Link to={"https://www.instagram.com/"} target='_blank' className="social">
                <img src="icon/instagram.svg" alt="" />
              </Link>
              <Link to={"https://www.facebook.com/"} target='_blank' className="social ms-3">
                <img src="icon/facebook.svg" alt="" />
              </Link>
              <Link to={"https://www.tiktok.com/"} target='_blank' className="social ms-3">
                <img src="icon/tiktok.svg" alt="" />
              </Link>
              <Link to={"https://www.vk.com/"} target='_blank' className="social ms-3">
                <img src="icon/vk.svg" alt="" />
              </Link>
            </div>
          </div>
          <img src="image/3.png" alt="" />
        </div>
        <div className="wellcome">
        <img src="image/4.png" alt="" />
          <div className="text ">
            <h3>Bizimlə Əlaqə</h3>
            <p>Aşağıda Qeyd Olunan Vasitələr İlə Bizimlə Əlaqə Saxlayaraq Əməkdaşlıq Edə Bilərsiniz!</p>
            <div className="buttons mt-3">
              <Link to="mailto:elibrary@info.az" className='btn btn-primary me-4'>E-Poçt İlə Göndər</Link>
              <Link to="https://wa.me/994709161820/" target='_blank' className='btn btn-outline-primary'>WhatsApp</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home