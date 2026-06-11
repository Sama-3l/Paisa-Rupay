import type { MDXComponents } from 'mdx/types'
import styles from './app/legal/legal.module.css'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    p:  ({ children }) => <p className={styles.p}>{children}</p>,
    li: ({ children }) => <li className={styles.li}>{children}</li>,
    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    hr: () => <hr className={styles.hr} />, ...components }
}