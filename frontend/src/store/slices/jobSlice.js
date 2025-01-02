import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche, searchKeyword]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "All",
    "Mumbai",
    "Delhi",
    "Chandigarh",
    "Pune",
    "Ludhiana",
    "Amritsar",
    "Hyderabad",
    "Jammu",
    "Jaipur",
    "Surat",
    "Rajkot",
    "Bikaner",
    "Jodhpur",
    "Vadodara",
    "Kolkata",
    "Shimla",
    "Nagpur",
    "Indore",
    "Varanasi",
    "Udaipur",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search for jobs..."
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((cityOption, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={cityOption}
                      name="city"
                      value={cityOption}
                      checked={city === cityOption}
                      onChange={() => setCity(cityOption)}
                    />
                    <label htmlFor={cityOption}>{cityOption}</label>
                  </div>
                ))}
              </div>
              <div className="niches">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((nicheOption, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={nicheOption}
                      name="niche"
                      value={nicheOption}
                      checked={niche === nicheOption}
                      onChange={() => setNiche(nicheOption)}
                    />
                    <label htmlFor={nicheOption}>{nicheOption}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {cities.map((cityOption, index) => (
                    <option value={cityOption} key={index}>
                      {cityOption}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  {nichesArray.map((nicheOption, index) => (
                    <option value={nicheOption} key={index}>
                      {nicheOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => (
                    <div className="card" key={element._id}>
                      {element.hiringMultipleCandidates === "Yes" ? (
                        <p className="hiring-multiple">
                          Hiring Multiple Candidates
                        </p>
                      ) : (
                        <p className="hiring">Hiring</p>
                      )}
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary">
                        <span>Salary:</span> Rs. {element.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On:</span>{" "}
                        {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link
                          className="btn"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-jobs-found">
                    <img
                      src="/images/notfound.png"
                      alt="No jobs found"
                      style={{ width: "100%" }}
                    />
                    <p>No jobs found. Try adjusting your filters!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
