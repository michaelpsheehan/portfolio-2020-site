
  // custom shaders to handle the geometry explosion effect and the fragment colour effect
  
  export const fragmentShader = `
  varying vec3 vOriginalPosition;
  uniform float time;
  
  void main() {
    vec3 color = normalize( sin(vOriginalPosition)) * 0.5 + 0.5;
    gl_FragColor = vec4(color,1.0);
  }`
  
  export const vertexShader = `
    uniform float time;
    uniform float explosion;
    attribute vec3 randomDirection;
    attribute float randomStrength;
    varying vec3 vOriginalPosition;
  
    void main () {
      vOriginalPosition = position.xyz;
      float stretch = time; 
      vec3 pos = position.xyz;
      pos += randomDirection * randomStrength * explosion;
      pos.xz *= sin(pos.y + stretch);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
    }`