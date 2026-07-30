import CountUp from "react-countup";


function StatsCard({

  title,

  value,

  icon,

  color,

  subtitle,

}) {


  return (


    <div

      className="stats-card"

      style={{

        borderTop:
          `4px solid ${color}`,

      }}

    >





      <div className="stats-header">






        <div

          className="stats-icon"

          style={{

            background: color,

          }}

        >

          {icon}


        </div>








        <div className="stats-info">





          <h4>

            {title}

          </h4>







          <h2>


            <CountUp

              key={value}

              end={value || 0}

              duration={1}

            />


          </h2>







          <p>

            {subtitle}

          </p>







        </div>







      </div>







    </div>


  );

}



export default StatsCard;