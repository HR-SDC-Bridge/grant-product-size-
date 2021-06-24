import React from 'react';
import axios from 'axios';
import ProductSizeButton from './ProductSizeButton.jsx';
import ProductSizeModal from './ProductSizeModal.jsx';

class ProductSize extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOverlay = this.toggleOverlay.bind(this);

    this.state = {
      data: [],
      image: '',
      overlay: 'overlay',
      id: window.location.href.split('/')[3]
    }
  }

  componentDidMount() {
    axios.get(`http://13.52.125.255/api/sizes/${this.state.id}`)
      .then((res) => {
        this.setState({data: res.data});
      });

    // axios.get(`http://localhost:3004//images/sizeService/${this.state.id}`)
    //   .then((res) => {
    //     this.setState({image: res.data});
    //   });
  }

  toggleOverlay(e) {
    e.preventDefault();
    if (this.state.overlay === "overlay") {
      this.setState({overlay: "overlay unhide"});
    } else {
      this.setState({overlay: "overlay"});
    }
  }

  render() {
    return (
      <div className="product-info-section__button">
        <ProductSizeModal
          sizes={this.state.data.sizes}
          image={this.state.image}
          toggleOverlay={this.toggleOverlay}
          isHidden={this.state.overlay === "overlay"} />
        <div
          className={this.state.overlay}
          onClick={this.toggleOverlay}></div>
        <ProductSizeButton
          handleClick={this.toggleOverlay} />
      </div>
    );
  }
}

export default ProductSize;
