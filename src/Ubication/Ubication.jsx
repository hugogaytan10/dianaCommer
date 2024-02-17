import React from "react";

export const Ubication = () => {
  return (
    <div>
        <h3 className="text-xl text-center text-black font-extrabold m-4">Ubicación</h3>
        <p className="text-center text-black m-2">Plaza Metropilitana de Moroleón Local <strong>14 A</strong></p>
        <p className="text-center text-black m-2 font-semibold">445-111-33-70 o 445-129-09-37</p>
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.4971868778423!2d-101.18539148464376!3d20.134517049284533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842cfaea088744d3%3A0x1bca8f42c7445268!2sPlaza%20Textil%20Metropolitana!5e0!3m2!1ses-419!2smx!4v1708207540402!5m2!1ses-419!2smx"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full m-auto"
        ></iframe>
      </div>
    </div>
  );
};
