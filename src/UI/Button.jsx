import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button({ children, disabled = false, to = null, type, onClick }) {
    // const className = "active:bg-salty-400 rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4"

    const base =
        'text-sm inline-block active:bg-salty-400 rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm';

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        base,
        small:
            base + ' px-4 py-2 md:px-5 md:py-2.5  text-xs',
        secondary:
            'text-sm border-2 border-stone-300 inline-block rounded-full font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus   :text-stone-800 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm px-4 py-2.5  md:px-6 md:py-3.5',
    };

    if (to)
        return (
            <Link className={styles[type]} to={to}>
                {children}
            </Link>
        );
    if (onClick) {
        return (
            <button disabled={disabled} className={styles[type]} onClick={onClick}>
                {children}
            </button>
        );
    }
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
}

export default Button;

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['primary', 'base', 'small', 'secondary']),
};