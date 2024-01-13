import React, { useEffect, useState } from "react";
import Button from "../layout/Button";
import LoadingComponent from "../layout/Loader";
import { Link, NavLink } from "react-router-dom";
import Carousels from "./Carousel";
import logoLight from '../../../public/Logo.png';
import logoDark from '../../../public/Logo d.png';


export default function Home() {

  // **Dark light check
  const userTheme = localStorage.getItem("theme");
  const [theme,setTheme]=useState(false);

  // top Loader
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {

    if (userTheme==="dark") {
      setTheme(true)
    }else{
      setTheme(false)
    }

    const timeoutId = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const randomIncrement = Math.floor(Math.random() * 50) + 1;
        const newProgress = Math.min(prevProgress + randomIncrement, 100);
        return newProgress;
      });
    }, 200);

    // Clean up the timeout and interval when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="">
      {isContentLoaded ? (
        <>

          <div className="relative px-6 lg:px-8 border pb-8  md:pb-0 md:pt-6">

            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50% - 11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50% - 30rem)] sm:w-[72.1875rem]" style={{ clipPath: "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>

            <div className="mx-auto max-w-2xl pt-16 md:py-11">
            <div className="mb-2 flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-[12px] md:text-sm leading-6 text-gray-600 dark:text-gray-50 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Announcing our next round of funding. 
                  <NavLink className="font-semibold text-orange-500">
                    <span className="absolute inset-0" aria-hidden="true"></span> Read more <span aria-hidden="true">&rarr;</span>
                  </NavLink>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">Discover, Learn, and Inspire Us Today</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">Dive into our world of stories and wisdom, where every scroll unveils a new chapter of inspiration and discovery</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <NavLink to={`/blogs`}><Button className="py-2.5 text-sm font-semibold px-3.5">Get started</Button></NavLink>
                </div>
              </div>

              <div className="absolute inset-x-0 top-[calc(100% - 13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100% - 30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50% + 3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50% + 36rem)] sm:w-[72.1875rem]" style={{ clipPath: "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
              </div>
            </div>
          </div>

          {/* Second section */}

          <div className="bg-white md:py-12 py-12 dark:bg-black dark:text-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Our Journey, Your Destination</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">Welcome to <span className="text-orange-500 font-medium">CODEANDBLOG</span>, where passion meets purpose we are a passionate team sharing insights, stories, and knowledge to inspire and accompany you on your exploration of diverse topics.</p>
              </div>
              <div className="mx-auto md:mt-16 max-w-2xl mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="w-[90vw] max-h-max md:w-[70vw] md:h-[58vh] mx-auto shadow-ld my-5 rounded-sm">
                  <Carousels />
                </div>
              </div>
              <div className="mx-auto mt-16 md:mt-20 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lifetime membership</h3>
                  <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">Embrace a lifelong learning journey with our exclusive lifetime membership. Experience continuous growth and exploration with us.</p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-orange-500">What’s included</h4>
                    <div className="h-px flex-auto bg-gray-100 dark:text-white"></div>
                  </div>
                  <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-white sm:grid-cols-2 sm:gap-6">
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-orange-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Private forum access
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-orange-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Member resources
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-orange-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Entry to annual conference
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-orange-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Official member t-shirt
                    </li>
                  </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-2xl bg-gray-50 dark:bg-black  py-10 text-center ring-1 ring-inset ring-gray-900/5 dark:ring-white lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-base font-semibold text-gray-600 dark:text-white">Don't Pay, own it forever</p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">$0</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-white">USD</span>
                      </p>
                      <Button to="/blogs" className="mt-10 block px-3 py-2 text-sm mx-auto">All features are Free</Button>
                      <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-white">Invoices and receipts not available for any type of purchase.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}

          <section class="relative isolate overflow-hidden bg-white dark:bg-black px-6 pb-24 pt-12  lg:px-8">
            <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-black dark:opacity-0 opacity-20"></div>
            <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-black shadow-xl dark:shadow-black shadow-indigo-600/10 ring-1 ring-indigo-50 dark:ring-black sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            <div class="mx-auto max-w-2xl lg:max-w-4xl">
              {
              //  TODO: Logo is not changing when switching to dark or light mode
              }
              <img class="mx-auto h-12" src={`${theme?"../../../public/Logo.png":"../../../public/Logo d.png"}`} alt="" />
              <figure class="mt-10">
                <blockquote class="text-center text-xl font-semibold leading-8 text-gray-900 dark:text-white sm:text-2xl sm:leading-9">
                  <p><span className="text-4xl text-orange-500">“</span>Explore exciting stories and learn new things with us! Dive into a world of discovery and inspiration. Join our community where we love to share cool stuff. Start your adventure now!<span className="text-4xl text-orange-500">”</span></p>
                </blockquote>
                <div className="flex flex-wrap justify-center gap-10">
                  <figcaption class="mt-10">
                    <img class="mx-auto h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/81561733?s=400&u=f79ed79220505ff06754e9c5097a3608b77c8574&v=4" alt="" />
                    <div class="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div class="font-semibold text-gray-900 dark:text-white">Sagar Singh</div>
                      <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900 dark:fill-white">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div class="text-gray-600 dark:text-gray-400">CEO of CodeAndBlog</div>
                    </div>
                  </figcaption>
                  <figcaption class="mt-10">
                    <img class="mx-auto h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/142565220?v=4" alt="" />
                    <div class="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div class="font-semibold text-gray-900 dark:text-white">Manendra Verma</div>
                      <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900 dark:fill-white">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div class="text-gray-600 dark:text-gray-400">CEO of CodeAndBlog</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </div>
          </section>

          {/* Section 4 */}

          <div className="relative overflow-hidden bg-gray-800 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div className="max-w-xl lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our blogs</h2>
                  <p className="mt-4 text-lg leading-8 text-gray-300">Subscribe to our blog for captivating stories, expert tips, and inspiration delivered straight to your inbox.</p>
                  <div className="mt-6 flex max-w-md gap-x-4">
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email" />
                    <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Subscribe</button>
                  </div>
                </div>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                  <div className="flex flex-col items-start">
                    <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                    </div>
                    <dt className="mt-4 font-semibold text-white">Weekly Blogs</dt>
                    <dd className="mt-2 leading-7 text-gray-400">Embark on a weekly journey. Explore new ideas in our blogs.</dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                      </svg>
                    </div>
                    <dt className="mt-4 font-semibold text-white">No spam</dt>
                    <dd className="mt-2 leading-7 text-gray-400">Expect excellence, not spam. Join us for insightful, spam-free updates.</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
              <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
          </div>





        </>



      ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}

    </div>
  );
}
