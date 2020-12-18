import React from 'react';

const Footer = () => {
    return (
        <footer class="footer">
                <div class="container-fluid">
                    <nav>
                        <ul class="footer-menu">
                            <li>
                                <a href="#">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                        <p class="copyright text-center">
                            © 
                            <script>
                                document.write(new Date().getFullYear())
                            </script>
                            <a href="https://asti.dost.gov.ph/"> DOST - ASTI</a>
                        </p>
                    </nav>
                </div>
            </footer>
        
    ) 
};

export default Footer;