let toastEl = null
let timer = null

export function showToast(msg = '已复制') {
  if (timer) { clearTimeout(timer); timer = null }
  if (toastEl) { toastEl.remove(); toastEl = null }

  toastEl = document.createElement('div')
  toastEl.textContent = '✓ ' + msg
  Object.assign(toastEl.style, {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
    zIndex: '9999', background: '#2C2C2C', color: '#F5F0E8',
    padding: '10px 24px 10px 20px', borderRadius: '8px', fontSize: '14px',
    opacity: '0', transition: 'opacity 0.25s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
    pointerEvents: 'none',
    border: '1.5px solid #C41E3A', fontFamily: '"Noto Serif SC", "Source Han Serif CN", serif'
  })
  document.body.appendChild(toastEl)
  requestAnimationFrame(() => { toastEl.style.opacity = '1' })
  timer = setTimeout(() => {
    toastEl.style.opacity = '0'
    setTimeout(() => { if (toastEl) { toastEl.remove(); toastEl = null } }, 300)
    timer = null
  }, 1200)
}
