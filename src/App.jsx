import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './BackgroundClock.css'; // Import BackgroundClock styles
import BackgroundClock from './BackgroundClock'; // Import BackgroundClock component

function App() {
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const [scrollTrigger, setScrollTrigger] = useState(0); // Dummy state to force re-render on scroll

  useEffect(() => {
    const updateMousePos = (e) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Update a dummy state to force re-render
      setScrollTrigger(prev => prev + 1);
    };

    window.addEventListener('mousemove', updateMousePos);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getShadowStyle = (elementRef) => {
    // Default shadow if mouse position is not yet available or element not mounted
    const defaultShadow = '0 10px 20px rgba(0, 0, 0, 0.3)'; // Matches default in App.css

    if (elementRef.current && (globalMousePos.x !== 0 || globalMousePos.y !== 0)) {
      const { left, top, width, height } = elementRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const offsetX = (globalMousePos.x - centerX) / (width / 2); // -1 to 1
      const offsetY = (globalMousePos.y - centerY) / (height / 2); // -1 to 1

      const shadowIntensity = 10; // Reduced for smoother animation
      return {
        boxShadow: `${-offsetX * shadowIntensity}px ${-offsetY * shadowIntensity}px 30px rgba(0, 0, 0, 0.5)`
      };
    }
    // Return default shadow if conditions for dynamic shadow are not met
    return { boxShadow: defaultShadow };
  };

  // Refs for each section to apply shadow effect
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const publicationsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <>
      <BackgroundClock />
      <div className="App">
        {/* Navigation Bar */}
        <header className="navbar">
          <a href="#" className="navbar-logo">Y.S.S. Rohit</a>
          <nav className="navbar-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#publications">Publications</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="hero-section section-card" ref={heroRef} style={getShadowStyle(heroRef)}>
          <h1 className="hero-headline">YARABATI SAI SANTHOSH ROHIT: AI/ML Engineer </h1>
          <p className="hero-subheadline">Final-year CSE student at Amrita School of Computing with hands-on experience in building AI systems and a focus on practical, accessible, and impactful AI solutions.</p>
          
          <div className="hero-buttons">
            <button className="portfolio-button" onClick={() => projectsRef.current.scrollIntoView({ behavior: 'smooth' })}>Explore My AI Projects</button>
            <button className="portfolio-button" onClick={() => publicationsRef.current.scrollIntoView({ behavior: 'smooth' })}>Read My Research</button>
          </div>
          <div className="social-links">
            <a href="https://github.com/frecklysledge0" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/rohit-yarabati-300790213" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:rohityarabati9@gmail.com">Email</a>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="section-card" ref={aboutRef} style={getShadowStyle(aboutRef)}>
          <h2>About Me & My Journey</h2>
          <div className="about-me-content">
            <p>Final-year CSE student at Amrita School of Computing with hands-on experience in building AI systems from medical voice interfaces and viva interaction classifiers to text-to-floorplan generators.</p>
            <p>Skilled in NLP, LLMs, ML classifiers, GANs, and diffusion models, with a focus on practical, accessible, and impactful AI solutions.</p>
            <p>My academic rigor and research contributions are reflected in my published papers. I am passionate about solving real-world problems through AI and constantly seek opportunities to grow as an engineer and researcher.</p>
          </div>
          <h3>Education Overview</h3>
          <div className="education-item">
            <h4>Amrita Vishwa Vidhyapeetham</h4>
            <p>Bachelor of Science in Computer Science, Sep. 2022 - May 2026</p>
            <p>CGPA: 7.96/10</p>
            <p>Bangalore, Karnataka</p>
          </div>
          <h3>Achievements/Certifications</h3>
          <ul>
            <li>IEEE Publications (as mentioned in Publications section)</li>
            <li>Udemy: Machine Learning A-Z (Aug 2023)</li>
          </ul>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-card" ref={projectsRef} style={getShadowStyle(projectsRef)}>
          <h2>My AI Innovations & Solutions</h2>
          <div className="projects-grid">
            {/* Project 1: MediVox */}
            <div className="project-card">
              <h4>MediVox: Assistive Medical Voice Interface</h4>
              <p><strong>Key Achievement:</strong> Automated report delivery via Twilio Voice; enabled sub-45s end-to-end latency with high comprehension in user study.</p>
              <p><strong>Technologies:</strong> AWS (Textract, Bedrock Claude, Translate), Python, LLMs, TTS, Twilio, Prompt Engineering.</p>
              <p><strong>Description:</strong> Engineered a serverless pipeline for medical report processing, simplifying complex medical text for layman understanding (Grade 8 readability) and automating delivery via voice.</p>
            </div>
            {/* Project 2: Viva Interaction Classification */}
            <div className="project-card">
              <h4>Viva Interaction Classification</h4>
              <p><strong>Key Achievement:</strong> Segmented and labeled interview audio... achieved F1-score of 0.81 with BERT-SVM combo... Incorporated LIME for local interpretability.</p>
              <p><strong>Technologies:</strong> Python, NLP, BERT, TF-IDF, SVM, Random Forest, AdaBoost, FastText, LIME.</p>
              <p><strong>Description:</strong> Developed an ML-NLP system for classifying viva segments (questions, answers, statements) from interview audio, enhancing interpretability.</p>
            </div>
            {/* Project 3: Analysis of different file compression algorithms */}
            <div className="project-card">
              <h4>Analysis of different file compression algorithms</h4>
              <p><strong>Key Achievement:</strong> Analyzed various file compression algorithms (e.g., Huffman, LZW, Run-Length Encoding) for efficiency and performance.</p>
              <p><strong>Technologies:</strong> Java, Data Structures, Algorithms, File I/O.</p>
              <p><strong>Description:</strong> A study and implementation of different file compression techniques to compare their effectiveness in reducing file size and processing time.</p>
            </div>
            {/* Project 4: Text-to-Floorplan Generation */}
            <div className="project-card">
              <h4>Text-to-Floorplan Generation</h4>
              <p><strong>Key Achievement:</strong> Built a text-to-image system using conditional diffusion models with U-Net and cross-attention, guided by BERT embeddings.</p>
              <p><strong>Technologies:</strong> Python, PyTorch, GANs, Diffusion Models, BERT, U-Net, RPLAN Dataset.</p>
              <p><strong>Description:</strong> An ongoing project focusing on generative AI to create floorplans from textual descriptions.</p>
            </div>
          </div>
        </section>

        {/* Publications / Research Section */}
        <section id="publications" className="section-card" ref={publicationsRef} style={getShadowStyle(publicationsRef)}>
          <h2>Published Research & Contributions</h2>
          <div className="publications-list">
            {/* Publication 1 */}
            <div className="publication-item">
              <h4>Classification in Viva Interactions: Distinguishing Questions, Answers, and Statements with BERT Embedding and SVM</h4>
              <p className="venue-date">IEEE Apr 2025</p>
              <p>Published IEEE paper proposing an ML-NLP system for classifying viva segments using BERT + SVM; achieved F1-score of 0.81 and introduced LIME for interpretability.</p>
              <a href="https://ieeexplore.ieee.org/document/11034900" target="_blank" rel="noopener noreferrer">Link to IEEE paper</a>
            </div>
            {/* Publication 2 */}
            
            <div className="publication-item">
              <h4>ITS: Power-Efficient VANET-Based Prototype Implementation</h4>
              <p className="venue-date">IEEE - May 2025</p>
              <p>Published paper presenting a VANET-based ITS model using NS-3 and SUMO, optimizing protocols (AODV, DSR, OLSR) for 22% energy savings and enhanced latency and packet delivery.</p>
              <a href="https://ieeexplore.ieee.org/abstract/document/11035427" target="_blank" rel="noopener noreferrer">Link to IEEE paper</a>
            </div>
            {/* Publication 3 */}
            <div className="publication-item">
              <h4>Comparative Analysis of Machine Learning Models for Stock Price Prediction</h4>
              <p className="venue-date">SSRN Oct 2024</p>
              <p>Published paper comparing ML models for financial forecasting; achieved 86.24% accuracy using Random Forest and applied hyperparameter tuning for optimization.</p>
              <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5089161" target="_blank" rel="noopener noreferrer">Link to SSRN paper</a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-card" ref={skillsRef} style={getShadowStyle(skillsRef)}>
          <h2>My Technical Stack</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Technologies & Concepts</h4>
              <ul>
                <li>Machine Learning</li>
                <li>NLP</li>
                <li>LLMs</li>
                <li>Generative AI (GANs, Diffusion)</li>
                <li>OCR</li>
                <li>Text-to-Speech</li>
                <li>Cloud Services (AWS, Twilio)</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Frameworks & Libraries</h4>
              <ul>
                <li>NumPy</li>
                <li>pandas</li>
                <li>Scikit-learn</li>
                <li>TensorFlow</li>
                <li>PyTorch</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Developer Tools</h4>
              <ul>
                <li>VS Code</li>
                <li>Eclipse</li>
                <li>Git</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Languages</h4>
              <ul>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-card" ref={contactRef} style={getShadowStyle(contactRef)}>
          <h2>Let's Connect!</h2>
          
          <div className="contact-info">
            <p>Direct Email: <a href="mailto:rohityarabati9@gmail.com">rohityarabati9@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/rohit-yarabati-300790213" target="_blank" rel="noopener noreferrer">linkedin.com/in/rohit-yarabati-300790213</a></p>
            <p>GitHub: <a href="https://github.com/frecklysledge0" target="_blank" rel="noopener noreferrer">github.com/frecklysledge0</a></p>
            
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 YARABATI SAI SANTHOSH ROHIT. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/frecklysledge0" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/rohit-yarabati-300790213" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;