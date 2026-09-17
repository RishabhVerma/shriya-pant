import { useCallback, useEffect, useRef, useState } from 'react'

const SLIDES = [
  { src: '/images/lawh-wa-qalam.jpg', alt: 'Lawh Wa Qalam: M. F. Husain Museum', credit: 'Image courtesy Qatar Foundation' },
  { src: '/images/design-space-alula.jpg', alt: 'Design Space AlUla', credit: 'Image courtesy Shoayb Khattab / Royal Commission for AlUla' },
  { src: '/images/women-to-women.jpg', alt: 'Women to Women', credit: 'Image courtesy Royal Commission for AlUla' },
  { src: '/images/mindscapes.jpg', alt: 'Mindscapes by Wellcome Trust', credit: 'Image courtesy Museum of Art and Photography' },
  { src: '/images/indian-ceramics-triennale.jpg', alt: 'Indian Ceramics Triennale', credit: 'Image courtesy Indian Ceramics Triennale' },
  { src: '/images/karkhana-chronicles.jpg', alt: 'Karkhana Chronicles', credit: 'Image courtesy Purpose Climate Lab' },
]

const FIELDS = ['Art', 'Design', 'Architecture', 'Public Initiatives']

const CLIENTS = [
  'Wellcome Trust', 'Women to Women (AlUla)', 'Lawh Wa Qalam: M. F. Husain Museum', 'Royal Commission for AlUla',
  'Manar Abu Dhabi', 'Design Space AlUla', 'Royal Institute of British Architects', 'Flint Culture', 'Sutton',
  'Scott&Co', 'Science Gallery Bengaluru', 'Purpose Climate Lab', 'Only Much Louder', 'Khoj', 'CultureCon',
  'Bacardi NH7 Weekender', 'Gujral Foundation', 'JCB Prize for Literature', 'Indian Ceramics Triennale',
  'Breezer Vivid Shuffle', 'Anant Art', 'Nodwin Gaming', 'Dreamhack', 'Serendipity Arts Festival', 'Ethico',
  'Chennai Photo Biennale', 'Jawahar Kala Kendra', 'Festivals from India', 'Story PR', 'Cleanlabel',
]

const AUTOPLAY_MS = 5000

function ScrollLine() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      ref.current.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div id="scrollline" ref={ref}></div>
}

function Slideshow() {
  const [cur, setCur] = useState(0)
  const timer = useRef(null)

  const go = useCallback((n) => {
    setCur((n + SLIDES.length) % SLIDES.length)
  }, [])

  // (Re)start autoplay; called on mount and after every manual navigation.
  const arm = useCallback(() => {
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setCur((c) => (c + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
  }, [])

  useEffect(() => {
    arm()
    return () => clearInterval(timer.current)
  }, [arm])

  return (
    <div className="right">
      <div className="stage" id="stage">
        {SLIDES.map((s, i) => (
          <div key={s.src} className={'slide' + (i === cur ? ' on' : '')} data-alt={s.alt} data-credit={s.credit}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
        <div className="grain"></div>
        <button className="nav-btn prev" id="prev" aria-label="Previous" onClick={() => { go(cur - 1); arm() }}>←</button>
        <button className="nav-btn next" id="next" aria-label="Next" onClick={() => { go(cur + 1); arm() }}>→</button>
      </div>
      <div className="capband">
        <div className="captxt">
          <span id="caption">{SLIDES[cur].alt}</span>
          <span id="credit">{SLIDES[cur].credit}</span>
        </div>
        <div className="dots" id="dots">
          {SLIDES.map((s, i) => (
            <button key={s.src} className={'dot' + (i === cur ? ' on' : '')} aria-label={`Slide ${i + 1}`} onClick={() => { go(i); arm() }}></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollLine />
      <nav>
        <a href="#welcome" className="name">Shriya Pant</a>
        <ul>
          <li><a href="#welcome">About</a></li>
          <li><a href="#clients">Clients</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section id="welcome">
        <div className="hero">
          <div className="left">
            <div className="leftinner">
              <h1>Thoughtful<br />communication for<br />the cultural<br />landscape</h1>
              <p className="lede">Representing leading cultural institutions, including galleries, museums, festivals and foundations, through strategic media relations and cultural partnerships.</p>
            </div>
            <ul className="fields">
              {FIELDS.map((f, i) => (
                <li key={f}>
                  {i > 0 && <span className="sep">•</span>}
                  {i > 0 ? '  ' + f : f}
                </li>
              ))}
            </ul>
          </div>
          <Slideshow />
        </div>
      </section>

      <section id="clients">
        <p className="eyebrow">Selected Work</p>
        <h2>Clients</h2>
        <ul className="clientlist">
          {CLIENTS.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <footer id="contact">
        <div className="fgrid">
          <div>
            <p className="flabel">Get in touch</p>
            <a className="linkedin" href="https://www.linkedin.com/in/shriya-pant-596a0722a/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <div>
            <p className="flabel">Contact Details</p>
            <div className="fdetail">
              <a href="mailto:shriyapant.work@gmail.com">shriyapant.work@gmail.com</a>
              <span>Goa, India</span>
            </div>
          </div>
          <div>
            <p className="flabel">Availability</p>
            <p className="favail">Open to new projects and institutional collaborations. Drop me a hello!</p>
          </div>
        </div>
        <div className="fbottom"><span>© 2026 Shriya Pant</span></div>
      </footer>
    </>
  )
}
