import React from "react";
import Rodal from "rodal";
import Image from "next/image";
import "rodal/lib/rodal.css";

import comingSoonImg from "@/public/img/coming-soon.png";

import "./style.scss";

interface Props {
  visible: boolean;
  onClose: () => void;
}

class ComingSoon extends React.Component<Props, never> {
  render() {
    return (
      <Rodal
        visible={this.props.visible}
        onClose={this.props.onClose}
        width={0}
        height={0}
        customStyles={{ height: "fit-content", width: "100%" }}
        className="coming-soon-modal"
      >
        <div className="coming-soon-content-box">
          {/* Используем компонент Image */}
          <Image src={comingSoonImg} alt="Вже незабаром" />
          <div className="action-box">
            <div className="text-box">
              <h4>В процессі розробки...</h4>
              <p className="description">
                Ми працюємо над тим, щоб надати вам найкращий продукт. Будь ласка, спробуйте
                пізніше.
              </p>
            </div>
            <button onClick={this.props.onClose} className="btn btn-active">
              Зрозуміло
            </button>
          </div>
        </div>
      </Rodal>
    );
  }
}

export default ComingSoon;
