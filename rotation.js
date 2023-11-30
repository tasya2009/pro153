AFRAME.registerComponent('rotation-component', {
    schema: {
      speed: { default: 1 }, 
    },
  
    init: function () {
      this.el.addEventListener('loaded', () => {
        this.rotate();
      });
    },
  
    rotate: function () {
      const rotationSpeed = this.data.speed;
      const rotationInterval = 20; 
  
      setInterval(() => {
        const currentRotation = this.el.getAttribute('rotation');
        const newRotation = {
          x: currentRotation.x,
          y: currentRotation.y + rotationSpeed,
          z: currentRotation.z,
        };
  
        this.el.setAttribute('rotation', newRotation);
      }, rotationInterval);
    }
  });
  
  AFRAME.registerComponent('scuba-diver', {
    init: function () {
      
      const diverModel = document.createElement('a-box');
      diverModel.setAttribute('width', '1');
      diverModel.setAttribute('height', '1');
      diverModel.setAttribute('depth', '1');
      diverModel.setAttribute('color', 'blue');
      this.el.appendChild(diverModel);
  
      
      const bubbleEntity = document.createElement('a-entity');
      bubbleEntity.setAttribute('position', '0 -0.5 0');
      bubbleEntity.setAttribute('animation__scale', {
        property: 'scale',
        dur: 1000,
        easing: 'easeInOutQuad',
        to: '1 1.2 1',
        dir: 'alternate',
        loop: 'true'
      });
      const bubble = document.createElement('a-sphere');
      bubble.setAttribute('radius', '0.1');
      bubble.setAttribute('color', 'white');
      bubbleEntity.appendChild(bubble);
      this.el.appendChild(bubbleEntity);
    }
  });
  
  AFRAME.registerComponent('movement-controls', {
    init: function () {
      const scubaDiver = this.el;
  
      window.addEventListener('keydown', function (event) {
        const rotationStep = 5;
        const positionStep = 0.2;
  
        switch (event.key) {
          case 'ArrowUp':
            scubaDiver.setAttribute('position', {
              x: scubaDiver.object3D.position.x,
              y: scubaDiver.object3D.position.y,
              z: scubaDiver.object3D.position.z - positionStep
            });
            break;
          case 'ArrowDown':
            scubaDiver.setAttribute('position', {
              x: scubaDiver.object3D.position.x,
              y: scubaDiver.object3D.position.y,
              z: scubaDiver.object3D.position.z + positionStep
            });
            break;
          case 'ArrowLeft':
            scubaDiver.setAttribute('rotation', {
              x: scubaDiver.object3D.rotation.x,
              y: scubaDiver.object3D.rotation.y + rotationStep,
              z: scubaDiver.object3D.rotation.z
            });
            break;
          case 'ArrowRight':
            scubaDiver.setAttribute('rotation', {
              x: scubaDiver.object3D.rotation.x,
              y: scubaDiver.object3D.rotation.y - rotationStep,
              z: scubaDiver.object3D.rotation.z
            });
            break;
        }
      });
    }
  });
  