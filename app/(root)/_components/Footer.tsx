import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center gap-2 text-sm text-gray-400 py-4 w-full border-t border-gray-800'>
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-sm text-gray-400">
              I'm a passionate full-stack developer who loves building web experiences with React, Next.js, and Django.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Email: yourname@example.com</li>
              <li>Phone: +880-123456789</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#skills" className="hover:underline">Skills</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Me</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default Footer