import React, { useContext } from "react";

function MessCard({ info, selected }) {
  return (
    <div className={`card ${selected ? `card-active` : ``} flex flex-row pl-0`}>
      <img src={`/images/${info.photo}`} alt={info.name} className="card-img" />
      <div>
        <h3>{info.name}</h3>
        <p>{info.desc}</p>
        <p>Size: {info.size}m2</p>
        <div className="d-flex align-items-end justify-content-between">
          <div>
            <img src="/images/icons/double-bed.svg" width="40" alt="" />
            <div>Beds: {info.beds}</div>
          </div>
          <div>People: {info.capacity}</div>
          <div className="price">
            {1 > 0 && (
              <>
                <div className="font-weight-normal text-right">
                  <small>
                    € <del>443</del>
                  </small>
                </div>
                <div>{(45 - (235 / 100) * 5).toFixed(2)}</div>
              </>
            )}
            {!1 && <span>€ 654</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessCard;
