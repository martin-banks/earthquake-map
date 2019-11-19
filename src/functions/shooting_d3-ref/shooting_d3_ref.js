/* globals d3, news */
/* eslint-disable */

// ! Integrating with VUE demo
// ! https://bl.ocks.org/lorenzopub/02ccce43d708919ca7c0b242fe1c93f2

var page = {
  // eslint-disable-line
  init: function() {},
  displayChanged: function(visibility) {
    if (visibility) {
      var containerWidth = $('.nnd-container').width()
      var deviceSelectWidth = 767
      var deviceType = containerWidth > deviceSelectWidth ? true : false
      var deviceRatio = deviceType ? 470 : 310
      var deviceSwarm = deviceType ? 35 : 20
      var data = []
      var d3 = {}
      // Change the values here everytime instead of going through all the code
      var peopleDied = 192
      var peopleInjured = 737
      // Don't forget to make the change to css as well with same numbers
      var heightDesktop = 1150
      var heightMobile = 2400
      // Empty strings created which will contain the data after D3 is loaded on the page
      var fillColor, strokeColor
      var dataLocation =
        typeof news !== 'undefined'
          ? news.network.interactive.configuration.DEPLOY_URLBASE
          : '//nca1030283/networkeditorial/USMassShootings2018/desktop/'
      // This function will trigger after D3 is loaded on the page
      // It will start drawing the D3 objects on the page
      var getdata = function () {
        d3.csv(dataLocation + 'assets/shootings.csv', function(d) {
          // eslint-disable-line
          // Assigning data the value from the csv file
          data = d
          // fill/stroke Color is defined here as d3 might not be available on page load
          fillColor = d3.scale
            .ordinal()
            .domain([-3, -2, -1, 0, 1, 2, 3])
            .range(['#df1c2a', '#f37f8a', '#e6afb6', '#00882a', '#99b7e2', '#6e98d2', '#3a17f2'])
          strokeColor = d3.scale
            .ordinal()
            .domain([-3, -2, -1, 0, 1, 2, 3])
            .range(['#f5dad9', '#e4566a', '#d4929d', '#75d68e', '#7996e3', '#4574c3', '#2700c8'])
          createNodes()
        })
      }
      // Create interval as sometimes D3 doesn't load on page load instantly
      // This will wait until D3 has loaded on the page and then it will start doing everything
      
      // in my demo we are including d3 as a module
      // no need to load here
      var v = setInterval(function() {
        d3 = loadD3() // eslint-disable-line
        if (typeof d3 !== 'undefined') {
          getdata()
          clearInterval(v)
        }
      }, 200)

      var extraYPos = 0
      var width = $('#main').width()
      var widthHalf = width / 2
      var height = getInnerHeight() // eslint-disable-line
      var center = {
        x: widthHalf,
        y: height / 2,
      }
      var incidentTypeCenters = {
        killed: {
          x: 390,
          y: height / 2,
        },
        injured: {
          x: 520,
          y: height / 2,
        },
      }
      var incidentTypeCentersMobile = {
        killed: {
          x: (width * 40) / 100,
          y: height / 2,
        },
        injured: {
          x: (width * 60) / 100,
          y: height / 2,
        },
      }
      var levelCenters = {
        '-3': {
          x: widthHalf,
          y: 300,
        },
        '-2': {
          x: widthHalf,
          y: 320,
        },
        '-1': {
          x: widthHalf,
          y: 340,
        },
        '0': {
          x: widthHalf,
          y: 360,
        },
        '1': {
          x: widthHalf,
          y: 380,
        },
        '2': {
          x: widthHalf,
          y: 400,
        },
        '3': {
          x: widthHalf,
          y: 420,
        },
      }
      var mx1 = widthHalf - (widthHalf / 3)
      var mx2 = widthHalf + (widthHalf / 3)
      var stateCenters = {
        Florida: { x: 230, y: 250, tx: 30, ty: 20, mx: mx1, my: 170, mtx: 0, mty: 0, total: 118 },
        Illinois: { x: 345, y: 260, tx: 230, ty: 20, mx: mx2, my: 170, mtx: widthHalf, mty: 0, total: 81 },
        California: { x: 470, y: 260, tx: 415, ty: 20, mx: mx1, my: 300, mtx: 0, mty: 180, total: 74 },
        Texas: { x: 590, y: 250, tx: 580, ty: 20, mx: mx2, my: 300, mtx: widthHalf, mty: 180, total: 55 },
        Alabama: { x: 720, y: 240, tx: 755, ty: 20, mx: mx1, my: 420, mtx: 0, mty: 340, total: 47 },
        Tennessee: { x: 220, y: 380, tx: 25, ty: 260, mx: mx2, my: 420, mtx: widthHalf, mty: 340, total: 45 },
        'North Carolina': { x: 300, y: 380, tx: 155, ty: 260, mx: mx1, my: 540, mtx: 0, mty: 490, total: 43 },
        'New Jersey': { x: 400, y: 385, tx: 305, ty: 260, mx: mx2, my: 540, mtx: widthHalf, mty: 490, total: 38 },
        'New York': { x: 500, y: 385, tx: 455, ty: 260, mx: mx1, my: 660, mtx: 0, mty: 630, total: 35 },
        Louisiana: { x: 600, y: 385, tx: 600, ty: 260, mx: mx2, my: 660, mtx: widthHalf, mty: 630, total: 35 },
        Kentucky: { x: 720, y: 385, tx: 760, ty: 260, mx: mx1, my: 770, mtx: 0, mty: 770, total: 32 },
        Pennsylvania: { x: 210, y: 495, tx: 25, ty: 430, mx: mx2, my: 770, mtx: widthHalf, mty: 770, total: 30 },
        Indiana: { x: 300, y: 495, tx: 155, ty: 430, mx: mx1, my: 890, mtx: 0, mty: 910, total: 28 },
        Missouri: { x: 400, y: 495, tx: 305, ty: 430, mx: mx2, my: 890, mtx: widthHalf, mty: 910, total: 26 },
        Michigan: { x: 500, y: 500, tx: 455, ty: 430, mx: mx1, my: 1020, mtx: 0, mty: 1060, total: 26 },
        Ohio: { x: 600, y: 505, tx: 600, ty: 430, mx: mx2, my: 1020, mtx: widthHalf, mty: 1060, total: 21 },
        Georgia: { x: 720, y: 505, tx: 760, ty: 430, mx: mx1, my: 1140, mtx: 0, mty: 1200, total: 20 },
        'District of Columbia': { x: 200, y: 600, tx: 25, ty: 580, mx: mx2, my: 1140, mtx: widthHalf, mty: 1200, total: 20 },
        Maryland: { x: 295, y: 595, tx: 155, ty: 580, mx: mx1, my: 1260, mtx: 0, mty: 1340, total: 19 },
        Mississippi: { x: 400, y: 595, tx: 305, ty: 580, mx: mx2, my: 1260, mtx: widthHalf, mty: 1340, total: 18 },
        Colorado: { x: 510, y: 600, tx: 455, ty: 580, mx: mx1, my: 1380, mtx: 0, mty: 1480, total: 18 },
        Nebraska: { x: 610, y: 605, tx: 600, ty: 580, mx: mx2, my: 1380, mtx: widthHalf, mty: 1480, total: 17 },
        Virginia: { x: 730, y: 610, tx: 760, ty: 580, mx: mx1, my: 1490, mtx: 0, mty: 1620, total: 14 },
        Oklahoma: { x: 180, y: 705, tx: 10, ty: 705, mx: mx2, my: 1490, mtx: widthHalf, mty: 1620, total: 13 },
        Kansas: { x: 270, y: 700, tx: 135, ty: 705, mx: mx1, my: 1600, mtx: 0, mty: 1750, total: 12 },
        Connecticut: { x: 370, y: 695, tx: 275, ty: 705, mx: mx2, my: 1600, mtx: widthHalf, mty: 1750, total: 8 },
        Arkansas: { x: 470, y: 695, tx: 410, ty: 705, mx: mx1, my: 1700, mtx: 0, mty: 1870, total: 8 },
        Minnesota: { x: 560, y: 705, tx: 525, ty: 705, mx: mx2, my: 1700, mtx: widthHalf, mty: 1870, total: 6 },
        'South Carolina': { x: 650, y: 705, tx: 640, ty: 705, mx: mx1, my: 1800, mtx: 0, mty: 1990, total: 5 },
        Delaware: { x: 750, y: 710, tx: 770, ty: 705, mx: mx2, my: 1800, mtx: widthHalf, mty: 1990, total: 5 },
        Washington: { x: 170, y: 810, tx: 10, ty: 830, mx: mx1, my: 1900, mtx: 0, mty: 2110, total: 4 },
        Utah: { x: 250, y: 800, tx: 110, ty: 830, mx: mx2, my: 1900, mtx: widthHalf, mty: 2110, total: 4 },
        Massachusetts: { x: 320, y: 800, tx: 210, ty: 830, mx: mx1, my: 2000, mtx: 0, mty: 2220, total: 4 },
      }
      var layoutGravity = -0.02
      var damper = 0.1
      var vis = null
      var nodes = []
      var force = null
      var circles = null
      var txtPos1 = 0
      var txtPos2 = 0
      var txtPos3 = 0
      var txtPos1Height = 0
      var txtPos2Height = 0
      var txtPos3Height = 0
      var triggerPoint1 = 0
      var triggerPoint2 = 0
      var triggerPoint3 = 0
      var triggerPointSVGExtended = 0
      var fivePercent = 0
      var svgExtentedHeight = deviceType ? heightDesktop : heightMobile

      var positionText = function() {
        height = getInnerHeight() // eslint-disable-line
        txtPos1Height = $('.nnd-text-cont-1')[0].offsetHeight
        txtPos2Height = $('.nnd-text-cont-2')[0].offsetHeight
        txtPos3Height = $('.nnd-text-cont-3')[0].offsetHeight
        extraYPos = txtPos3Height
        fivePercent = height * 0.5
        txtPos1 = ((height - deviceRatio) / 2 - txtPos1Height) / 2
        txtPos2 = height + fivePercent
        txtPos3 = height * 2
        triggerPoint2 = fivePercent + txtPos2Height
        triggerPoint3 = height + txtPos3Height
        triggerPointSVGExtended = height * 2
        if (txtPos1 < 30) {
          if (deviceType) {
            txtPos1 = 30
          } else {
            txtPos1 = 10
          }
        }
        var contHeight = svgExtentedHeight > height ? svgExtentedHeight - height + height * 3 : height * 3
        $('.nnd-container').css('height', contHeight)
        $('.nnd-text-cont-1').css('top', txtPos1)
        $('.nnd-text-cont-2').css('top', txtPos2)
        $('.nnd-text-cont-3')
          .css('top', txtPos3)
          .find('.nnd-totalstates')
          .text(Object.keys(stateCenters).length)
        return false
      }

      var createNodes = function() {
        var maxAmount = d3.max(data, function(d) {
          return parseInt(d.number)
        })
        var radiusScale = d3.scale
          .pow()
          .exponent(0.5)
          .domain([0, maxAmount])
          .range([2, deviceSwarm])

        data.forEach(d => {
          var groupColor = function(type, value) {
            if (type === 'killed') {
              if (value >= 8) {
                return -Math.abs(3)
              } else if (value < 8 && value >= 4) {
                return -Math.abs(2)
              } else if (value > 0 && value < 4) {
                return -Math.abs(1)
              } else {
                return 0
              }
            } else {
              if (value >= 10) {
                return 3
              } else if (value < 10 && value >= 5) {
                return 2
              } else if (value > 0 && value < 5) {
                return 1
              } else {
                return 0
              }
            }
          }
          var node = {
            id: d.id,
            radius: radiusScale(parseInt(d.number)),
            value: parseInt(d.number),
            name: d.grant_title,
            state: d.state,
            incidenttype: d.incidenttype,
            color: groupColor(d.incidenttype, parseInt(d.number)),
            x: Math.random() * 900,
            y: Math.random() * 1200,
            level: d.level,
          }
          nodes.push(node)
        })
        return (
          nodes.sort(function(a, b) {
            return b.value - a.value
          }) && createVis()
        )
      }

      var CustomTooltip = function(tooltipId, width) {
        if (width) {
          $('.nnd-container')
            .parents('body')
            .find('#' + tooltipId)
            .css('width', width)
        }

        var showTooltip = function(content, event, data) {
          $('.nnd-container')
            .parents('body')
            .find('#' + tooltipId)
            .html(content)
          $('.nnd-container')
            .parents('body')
            .find('#' + tooltipId)
            .addClass('nnd-show nnd-type-' + data.incidenttype)

          updatePosition(event, data)
        }
        var hideTooltip = function() {
          $('.nnd-container')
            .parents('body')
            .find('#' + tooltipId)
            .removeClass('nnd-show nnd-type-injured nnd-type-killed')
        }

        hideTooltip()

        var updatePosition = function(event, data) {
          var ttid = '#' + tooltipId
          var isExtended = $('#vis').hasClass('nnd-svgextended') ? svgExtentedHeight - height + 5 : 0
          var addHeight = currentView === 'states' ? (height * 10) / 100 : 0
          var tth = $(ttid)[0].offsetHeight - addHeight + isExtended
          var wscrY = windowScrollTop()
          var ttleft = data.x
          var tttop = data.y - data.radius - tth + wscrY
          $('.nnd-container')
            .parents('body')
            .find(ttid)
            .css('top', tttop + 'px')
            .css('left', ttleft + 'px')
        }
        return {
          showTooltip: showTooltip,
          hideTooltip: hideTooltip,
          updatePosition: updatePosition,
        }
      }

      var tooltip = CustomTooltip('nnd_shootings_tooltip', 200)

      var createVis = function() {
        vis = d3
          .select('#vis')
          .append('svg')
          .attr('id', 'svg_vis')
        // .attr('height', height) // eslint-disable-line
        circles = vis
          .selectAll('circle')
          .data(nodes, d => d.id)

        circles
          .enter()
          .append('circle')
          .attr('r', 0)
          .attr('fill', d => fillColor(d.color))
          .attr('stroke-width', 1)
          .attr('stroke', d => d3.rgb(strokeColor(d.color)))
          .attr('id', d => 'bubble_' + d.id)
          .on('mouseover', function(d) {
            return showDetails(d, i, $(this)[0])
          })
          .on('mouseout', function(d, i) {
            return hideDetails(d, i, $(this)[0])
          })

        return (
          circles
            .transition()
            .duration(2000)
            .attr('r', d => d.radius) && start()
        )
      }

      var charge = d => -Math.pow(d.radius, 2.0) / 8


      // Kick everything off
      var start = function() {
        force = d3.layout
          .force()
          .nodes(nodes)
          .size([width, height])
        return displayGroupAll()
      }

      var displayGroupAll = function() {
        force
          .gravity(layoutGravity)
          .charge(charge)
          .friction(0.9)
          .on('tick', function(e) {
            return circles
              .each(moveTowardsCenter(e.alpha))
              .attr('cx', d => d.x)
              .attr('cy', d => {
                txtPos1 = txtPos1 > d.y ? d.y : txtPos1
                return d.y
              })
          })

        force.start()
        return hideIncidentTypes() && hideStates()
      }

      var displayByStates = function() {
        force
          .gravity(layoutGravity)
          .charge(charge)
          .friction(0.9)
          .on('tick', function(e) {
            return circles
              .each(moveTowardsStates(e.alpha))
              .attr('cx', d => d.x)
              .attr('cy', d => d.y + (extraYPos - 20))
          })

        force.start()
        return displayStates() && hideIncidentTypes()
      }

      var moveTowardsStates = function(alpha) {
        return (function() {
          return function(d) {
            var target = stateCenters[d.state]
            d.x = d.x + ((deviceType ? target.x : target.mx) - d.x) * (damper + 0.02) * alpha * 1

            const widthByDevice = deviceType ? target.y : target.my
            let returnValue = (d.y = d.y + (widthByDevice - d.y) * (damper + 0.02) * alpha * 1)
            return returnValue
          }
        })()
      }

      var displayStates = function() {
        var states
        var statesData
        var statesXY = stateCenters
        var txtContWidth = deviceType ? 150 : widthHalf
        statesData = d3.keys(statesXY)
        states = vis.selectAll('.states').data(statesData)

        return states
          .enter()
          .append('foreignObject')
          .attr('width', txtContWidth)
          .attr('height', 42)
          .attr('x', d => (deviceType ? statesXY[d].tx : statesXY[d].mtx))
          .attr('y', function(d) {
            var returnValue = deviceType ? statesXY[d].ty : statesXY[d].mty
            return returnValue + extraYPos
          })
          .attr({
            'text-anchor': 'middle',
            class: 'states',
          })
          .append('xhtml:body')
          .attr({
            style: 'background-color:transparentbackground:transparent',
          })
          .html(d => d + `<span>${statesXY[d].total}</span>`)
          .style('opacity', 0)
          .transition()
          .delay(200)
          .duration(200)
          .style('opacity', 1)
      }

      var hideStates = function() {
        var states = vis.selectAll('.states').remove()
        return states
      }

      var moveTowardsCenter = function(alpha) {
        return function(d) {
          d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha
          var returnValue = (d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha)
          return returnValue
        }
      }

      // Layout each entry grouped by state
      var displayByLevel = function() {
        // force is used to handle the layout updates with collision detection
        force
          // setup ...
          .gravity(layoutGravity)
          .charge(charge)
          .friction(0.9)
          // for each frame of animation; update coords
          .on('tick', function(e) {
            return (
              circles
                // calculate new coords based on the center of each group
                // ? what is alpha?
                .each(moveTowardsLevel(e.alpha))
                // now apply the newly calcualted points
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
            )
          })

        force.start()
        // additional function changing changing the non-d3 layout
        return hideIncidentTypes() && hideStates()
      }
      // Calcualting new center point for each group
      var moveTowardsLevel = function(alpha) {
        // ? why return a function in an IFFE
        return (function() {
          return function(d) {
            // Level is a propperty attached to each data point
            // get the details from the centers object for that groups center
            var target = levelCenters[d.level]
            // modify this datapoints' x/y coords
            d.x = d.x + (target.x - d.x) * (damper + 0.02) * alpha * 1.1
            d.y = d.y + (target.y - d.y) * (damper + 0.02) * alpha * 1.1
            return ''
          }
        })()
      }

      var displayByIncidentType = function() {
        force
          .gravity(layoutGravity)
          .charge(charge)
          .friction(0.9)
          .on('tick', function(e) {
            return circles
              .each(moveTowardsIncidentType(e.alpha))
              .attr('cx', d => d.x)
              .attr('cy', d => d.y)
          })

        force.start()
        return displayIncidentType() && hideStates()
      }

      var moveTowardsIncidentType = function(alpha) {
        return (function() {
          return function(d) {
            var target
            target = deviceType ? incidentTypeCenters[d.incidenttype] : incidentTypeCentersMobile[d.incidenttype]

            d.x = d.x + (target.x - d.x) * (damper + 0.02) * alpha * 1.1
            var returnValue = (d.y = d.y + (target.y - d.y) * (damper + 0.02) * alpha * 1.1)
            return returnValue
          }
        })()
      }

      var displayIncidentType = function() {
        var incidentTypes, incidentTypesData, incidentTypesX
        var txtContWidth = deviceType ? 180 : 150
        var txtYPos = height / 2
        incidentTypesX = {
          Killed: {
            x: 0,
            y: txtYPos,
            html: `${peopleDied}<span>Number of people killed in mass shootings in the US <strong>this year</strong></span>`,
          },
          Injured: {
            x: width - txtContWidth,
            y: txtYPos,
            html: `${peopleInjured}<span>Number of people injured in mass shootings in the US <strong>this year</strong></span>`,
          },
        }
        incidentTypesData = d3.keys(incidentTypesX)
        incidentTypes = vis.selectAll('.incidenttypes').data(incidentTypesData)

        return incidentTypes
          .enter()
          .append('foreignObject')
          .attr('width', txtContWidth)
          .attr('height', 120)
          .attr('x', d => incidentTypesX[d].x)
          .attr('y', d => incidentTypesX[d].y)
          .attr({
            'text-anchor': 'middle',
            class: 'incidenttypes',
          })
          .append('xhtml:body')
          .attr({
            style: 'background-color:transparentbackground:transparent',
          })
          .html(function(d) {
            return incidentTypesX[d].html
          })
          .style('opacity', 0)
          .transition()
          .delay(200)
          .duration(200)
          .style('opacity', 1)
      }

      var hideIncidentTypes = function() {
        var incidenttypes = vis.selectAll('.incidenttypes').remove()
        return incidenttypes
      }

      var showDetails = function(data, i, element) {
        d3.select(element).attr('stroke', 'black')

        var content = `<span class="nnd-type">${data.incidenttype}</span>`
        content += `<span class="nnd-county">${data.name}</span><br/>`
        content += `<span class="nnd-state">${data.state}</span><br/>`
        content += `<span class="nnd-number">${data.value}</span><br/>`
        content += `<span class="nnd-dot"></span>`
        return tooltip.showTooltip(content, d3.event, data)
      }

      var hideDetails = function(data, i, element) {
        d3.select(element).attr(
          'stroke',
          (function() {
            return d => d3.rgb(strokeColor(d.color))
          })()
        )
        return tooltip.hideTooltip()
      }

      var hideDetails = function(data, i, element) {
        d3.select(element).attr('stroke', d => d3.rgb(strokeColor(d.color)))
        return tooltip.hideTooltip()
      }

      var scrollEvent = function(event) {
        if ($('#nnd_shootings_tooltip').hasClass('nnd-show')) {
          $('#nnd_shootings_tooltip').removeClass('nnd-show')
        }
        var fromTop = event.target.scrollingElement.scrollTop

        if (fromTop < triggerPoint2) {
          toggleView('all')
        } else if (fromTop >= triggerPoint2) {
          if (fromTop >= triggerPoint3) {
            // $('#vis').css('height', svgExtentedHeight)
            toggleView('states')
            if (fromTop > triggerPointSVGExtended) {
              $('#vis').addClass('nnd-svgextended')
            } else {
              $('#vis').removeClass('nnd-svgextended')
            }
          } else {
            toggleView('incidenttype')
          }
        }
      }

      positionText()
      loadScrollEvent(scrollEvent)
      onWindowResize(positionText)

      var currentView = 'all'
      var toggleView = function(viewType) {
        if (currentView !== viewType) {
          currentView = viewType
          if (viewType === 'incidenttype') {
            $('#vis').removeClass('liststates')
            return displayByIncidentType()
          } else if (viewType === 'all') {
            $('#vis').removeClass('liststates')
            return displayGroupAll()
          } else if (viewType === 'states') {
            $('#vis').addClass('liststates')
            return displayByStates()
          } else {
            $('#vis').removeClass('liststates')
            return displayByLevel()
          }
        }
      }
    }
  },
  deinit: function() {},
}
