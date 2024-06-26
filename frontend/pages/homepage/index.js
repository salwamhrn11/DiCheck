import * as React from "react";
import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);
  const [userName, setUserName] = useState('Loading...');
  const user = JSON.parse(localStorage.getItem('user'));

  const user_id = user._id;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://172.214.80.89:8080/api/user/one/${user_id}`);
      console.log(res.data);
      setUserName(res.data.first_name + ' ' + res.data.last_name);
    };

    fetchProfile();
  }, []);

  return (
    <header className="flex gap-5 justify-between px-8 py-8 w-full bg-white rounded-3xl border border-violet-100 border-solid shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-md:flex-wrap">
        <div className="flex gap-5 text-base font-semibold leading-4 text-slate-800">
          <img
            loading="lazy"
            src="/images/dicheck_logo.svg"
            className="shrink-0 w-12 aspect-square"
            alt="DiCheck logo"
          />
          <div style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }} className="my-auto">
            <a href="/homepage">DiCheck</a>
          </div>
          <div style={{ borderLeft: '3px solid #2d3748', height: '30px', alignSelf: 'center' }}></div>
          <div style={{ fontFamily: 'Montserrat-Regular', fontSize: '18 px', fontWeight: '400', letterSpacing: '1px' }} className="my-auto text-neutral-500">
            <p>Your trusted health partner</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between text-sm font-medium leading-6 text-gray-900">
        <div className="flex gap-5 items-center relative">
          <img
            loading="lazy"
            src="/images/ava_default.png"
            className="shrink-0 self-stretch w-12 aspect-square"
            alt="User Avatar"
          />
          <div style={{ fontFamily: 'Montserrat-Bold', fontSize: '15px' }} className="text-slate-800 self-stretch my-auto mr-8">
            <p>{userName}</p>
            <p className="text-neutral-500" style={{fontFamily: 'Montserrat-Light'}}>User</p>
          </div>
          <img
            onClick={toggleDropdown}
            loading="lazy"
            src="/images/dropdown_icon.svg"
            className="shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
            alt="Dropdown Icon"
          />
          {isOpen && (
            <div style={{fontFamily: 'Montserrat-Semibold', top: '2em', right: '0'}} ref={dropdownRef} className="absolute w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
              <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-slate-800 hover:text-white" onClick={() => localStorage.removeItem('user')}>Log Out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Articles() {
  const articles = [
    {
      date: "04 June 2023",
      title: "Manfaat Olahraga Rutin untuk Kesehatan Mental",
      description: "Olahraga tidak hanya penting untuk kesehatan fisik, tetapi juga memiliki banyak manfaat untuk kesehatan mental.",
      imgSrc: "/images/olahraga_2.png",
      imgAlt: "Manfaat Olahraga Rutin untuk Kesehatan Mental",
      href: "/articles/article-1"
    },
    {
      date: "03 June 2023",
      title: "Pentingnya Vaksinasi dalam Mencegah Penyakit Menular",
      description: "Vaksinasi adalah salah satu intervensi kesehatan masyarakat yang paling efektif dalam mencegah penyebaran penyakit menular.",
      imgSrc: "/images/vaksin_2.png",
      imgAlt: "Pentingnya Vaksinasi dalam Mencegah Penyakit Menular",
      href: "/articles/article-2"
    }
  ];

  return (
    <article className="flex flex-col w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow px-9 py-8 w-full font-medium bg-white rounded-3xl border border-violet-100 border-solid shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <header className="flex gap-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <h2 style={{ fontFamily: 'Montserrat-Bold', fontSize: '25px' }} className="flex-auto my-auto text-base leading-6 text-slate-800"> Read Articles</h2>
          <Link href="/articles">
            <button className="px-10 py-4 text-sm font-bold tracking-wide leading-5 text-center text-white whitespace-nowrap bg-gray-600 rounded-md hover:bg-gray-900 max-md:px-5 max-md:mt-10 max-md:max-w-full" style={{ fontFamily: 'Montserrat-Bold', alignSelf: 'center', marginTop: '20px' }}>Another Article</button>
          </Link>
          <div className="flex gap-2 whitespace-nowrap">
          </div>
        </header>
        <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px', fontWeight: '400' }} className="text-neutral-500">Ingin menambah wawasan? Yuk baca artikel di bawah!</p>
        <div className="mt-8 flex flex-col gap-5">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              date={article.date}
              title={article.title}
              description={article.description}
              imgSrc={article.imgSrc}
              imgAlt={article.imgAlt}
              href={article.href}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function Card({ children }) {
  return (
    <section className="flex flex-col px-8 pt-8 pb-10 w-full text-xs font-medium leading-5 bg-white rounded-3xl border border-violet-100 border-solid shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {children}
    </section>
  );
}

function MyComponent() {
  const [checks, setChecks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalChecks, setTotalChecks] = useState(0);
  const [totalChecksToday, setTotalChecksToday] = useState(0);
  const [lastCheckTime, setLastCheckTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
      setUserId(user._id);
    }
  }, [router]);

  useEffect(() => {
    if (!loading) {
      const fetchChecks = async () => {
        try {
          const response = await axios.get(`http://172.214.80.89:8080/api/record/${userId}?page=${page}&limit=${limit}`);
          setChecks(response.data.records);
          setTotalPages(response.data.totalPages);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching check records:', error);
        }
      };

      const fetchTotalChecks = async () => {
        try {
          const response = await axios.get(`http://172.214.80.89:8080/api/record/total/${userId}`);
          setTotalChecks(response.data.totalRecords);
        } catch (error) {
          console.error('Error fetching total checks:', error);
        }
      };

      const fetchTotalChecksToday = async () => {
        try {
          const response = await axios.get(`http://172.214.80.89:8080/api/record/total_today/${userId}`);
          setTotalChecksToday(response.data.totalRecords);
        } catch (error) {
          console.error('Error fetching total checks today:', error);
        }
      };

      const fetchLatestCheckTime = async () => {
        try {
          const response = await axios.get(`http://172.214.80.89:8080/api/record/latest_record/${userId}`);
          setLastCheckTime(response.data.latestRecordTime);
        } catch (error) {
          console.error('Error fetching latest check time:', error);
        }
      };

      fetchChecks();
      fetchTotalChecks();
      fetchTotalChecksToday();
      fetchLatestCheckTime();
    }
  }, [loading, page, limit, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let formattedDate = '-';
  if (lastCheckTime) {
    const date = new Date(lastCheckTime);
    formattedDate = date.toLocaleDateString('id-ID');
  }

  return (
    <div className="flex flex-col p-10 bg-slate-50 max-md:px-5">
      <Navbar />
      <section className="px-8 py-8 mt-10 bg-white rounded-3xl border border-violet-100 border-solid shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="grid grid-cols-3 gap-5 max-md:flex-col max-md:gap-0" style={{ gridTemplateColumns: '1.5fr 1fr 2fr' }}>
          <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
            <header className="flex grow gap-5 font-medium max-md:mt-5">
              <h2 style={{ fontFamily: 'Montserrat-Bold', fontSize: '25px' }} className="grow text-base leading-6 text-slate-800 w-fit">
                Cek Sekarang
              </h2>
            </header>
            <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px', fontWeight: '400' }} className="text-neutral-500 mt-5">Segera cek gejala dan berikan penanganan awal</p>
            <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px', fontWeight: '400' }} className="text-neutral-500 mt-2">DiCheck siap membantu!</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link href="/check-disease">
              <button className="px-10 py-4 text-sm font-bold tracking-wide leading-5 text-center text-white hover:bg-gray-900 whitespace-nowrap bg-gray-600 rounded-md max-md:px-5 max-md:mt-10 max-md:max-w-full" style={{ fontFamily: 'Montserrat-Bold', alignSelf: 'center', marginTop: '20px' }}>
                Check Now
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 max-md:mt-5">
            <div className="box flex flex-col items-center justify-center">
              <p style={{ fontFamily: 'Montserrat-Semibold'}} className="mb-5 grow text-base leading-6 text-slate-800 w-fit text-sm md:text-base lg:text-lg xl:text-0.5xl" >Total checks today</p>
              <p style={{ fontFamily: 'Montserrat-Light'}} className="grow leading-6 text-slate-800 w-fit text-1xl md:text-3xl lg:text-4xl xl:text-4xl">{totalChecksToday}</p>
            </div>
            <div className="box flex flex-col items-center justify-center">
              <p style={{ fontFamily: 'Montserrat-Semibold'}} className="mb-5 grow leading-6 text-slate-800 w-fit text-sm md:text-base lg:text-lg xl:text-0.5xl" >Last check time</p>
              <p style={{ fontFamily: 'Montserrat-Light'}} className="grow leading-6 text-slate-800 w-fit text-1xl md:text-3xl lg:text-4xl xl:text-4xl">{formattedDate}</p>
            </div>
            <div className="box flex flex-col items-center justify-center">
              <p style={{ fontFamily: 'Montserrat-Semibold'}} className="mb-5 grow leading-6 text-slate-800 w-fit text-sm md:text-base lg:text-lg xl:text-0.5xl" >Total checks</p>
              <p style={{ fontFamily: 'Montserrat-Light'}} className="grow leading-6 text-slate-800 w-fit text-1xl md:text-2xl lg:text-4xl xl:text-4xl" >{totalChecks}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 max-md:max-w-full">
        <div className="lg:grid lg:grid-cols-2 gap-5 max-md:flex-col max-md:gap-0" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          <Articles />
          <Card>
            <header style={{ fontFamily: 'Montserrat-Bold', fontSize: '25px' }} className="mb-5 gap-5 pr-20 text-slate-800 font-semibold leading-6 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
              Recent Checks
            </header>
            <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px', fontWeight: '400' }} className="mb-5 text-neutral-500">Cek medical records kamu disini!</p>
            <div className="mt-5 text-sm leading-6 text-gray-400 max-md:max-w-full">
              {checks.length === 0 ? (
                <p>No checks found.</p>
              ) : (
                <>
                <div className="pagination">
                  <button className="text-sm font-bold tracking-wide leading-5 text-center text-white whitespace-nowrap rounded-md max-md:px-5 max-md:mt-10 max-md:max-w-full"
                    onClick={() => setPage(prevPage => prevPage - 1)} 
                    disabled={page === 1} 
                    style={{
                      color: page === 1 ? '#ccc' : '#008CBA', 
                      cursor: page === 1 ? 'not-allowed' : 'pointer', 
                      fontFamily: 'Montserrat-Bold',
                      fontSize: '20px', 
                      alignSelf: 'center', 
                      marginRight: '20px',
                      transition: 'color 0.3s ease' 
                    }}
                  >
                    Previous
                  </button>
                  <button className="text-sm font-bold tracking-wide leading-5 text-center text-white whitespace-nowrap rounded-md max-md:px-5 max-md:mt-10 max-md:max-w-full"
                    onClick={() => setPage(prevPage => prevPage + 1)} 
                    disabled={page === totalPages} 
                    style={{
                      color: page === totalPages ? '#ccc' : '#008CBA', 
                      cursor: page === totalPages ? 'not-allowed' : 'pointer', 
                      fontFamily: 'Montserrat-Bold',
                      fontSize: '20px',  
                      alignSelf: 'center', 
                      marginBottom: '40px',
                      transition: 'color 0.3s ease' 
                    }}
                  >
                    Next
                  </button>
                </div>
                <ul>
                  {checks.map((check) => (
                    <li key={check._id} className="grid grid-cols-2 mb-10" style={{ gridTemplateColumns: '1.5fr 1.5fr' }}>
                      <p style={{ fontFamily: 'Montserrat-Bold', fontSize: '17px' }} className="mb-2 grow leading-6 text-slate-800 w-fit">Disease:</p> 
                      <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px' }} className="mb-2 grow leading-6 text-neutral-500 w-fit">{check.disease}</p>
                      <p style={{ fontFamily: 'Montserrat-Bold', fontSize: '17px' }} className="mb-2 grow leading-6 text-slate-800 w-fit">Symptoms:</p> 
                      <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px' }} className="mb-2 grow leading-6 text-neutral-500 w-fit">
                        {check.symptoms.map(symptom => symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')}
                      </p>
                      <p style={{ fontFamily: 'Montserrat-Bold', fontSize: '17px' }} className="mb-2 grow leading-6 text-slate-800 w-fit">Record Date:</p> 
                      <p style={{ fontFamily: 'Montserrat-Regular', fontSize: '17px' }} className="mb-2 grow leading-6 text-neutral-500 w-fit"> {new Date(check.record_date).toLocaleString('id-ID')}</p>
                      <button onClick={() => window.location.href=`/${check._id}`} className="px-10 py-4 text-sm font-bold tracking-wide leading-5 text-center hover:bg-gray-900 text-white whitespace-nowrap bg-gray-600 rounded-md max-md:px-5 max-md:mt-10 max-md:max-w-full" style={{ fontFamily: 'Montserrat-Bold', alignSelf: 'center', marginTop: '20px' }}>
                        Detail
                      </button>
                    </li>
                  ))}
                </ul>
                </>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default MyComponent;