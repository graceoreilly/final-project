import styles from "./footer.module.css";

const teamMembers = [
  { name: "Kim", github: "https://github.com/Kinukeo" },
  { name: "Chris", github: "https://github.com/Lawlor-C" },
  { name: "Shanti", github: "https://github.com/codesungrape" },
  { name: "Grace", github: "	https://github.com/graceoreilly" },
  { name: "Sam", github: "https://github.com/fenrissa92" },
  { name: "Monika", github: "https://github.com/lammona" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.credit}>
          Created with 💚 by{" "}
          {teamMembers.map((member, index) => (
            <span key={member.name}>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {member.name}
              </a>
              {index < teamMembers.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

// import styles from "./footer.module.css";

// export default function Footer() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.content}>
//         <p className={styles.credit}>
//           Created with ❤️ by Kim, Chris, Shanti, Grace, Sam and Monika
//         </p>
//       </div>
//     </footer>
//   );
// }
