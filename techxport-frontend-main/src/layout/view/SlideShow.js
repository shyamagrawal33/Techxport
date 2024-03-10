import React from 'react'
import PropTypes from 'prop-types'
const delay = 2500
let colors = []
function Slideshow(props) {
  Slideshow.propTypes = {
    color: PropTypes.object,
  }
  // console.log(props.color)
  colors = props.color
  const [index, setIndex] = React.useState(0)
  const timeoutRef = React.useRef(null)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)),
      delay,
    )
    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {colors.map((backgroundColor, index) => (
          <div className="slide" key={index}>
            <div>
              <p className="pera">
                There are many variations of passages Lorem Ipsum available, but the majority have
                suffered alteration in some form, by injected humour, or randomised words which
                don&apos;t look even slightly believable.
              </p>
              <p className="pera" style={{ marginTop: '0.5em' }}>
                <img
                  alt="..."
                  src={require('../../assets/img/eva.jpg')}
                  style={{ width: '2em', borderRadius: '50%', marginRight: '0.5em' }}
                />
                <span style={{ fontSize: '20px' }}>Maggie Brown</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            style={{ width: 100 / colors.length + '%' }}
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
