const Footer = () => {
  return (
    <footer className="py-4 text-white bg-gray-900">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          <p className="text-sm">
            © 2023 BTC Blockchain Explorer. All rights reserved.
          </p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-gray-300 transition duration-300 hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 transition duration-300 hover:text-white"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 transition duration-300 hover:text-white"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
