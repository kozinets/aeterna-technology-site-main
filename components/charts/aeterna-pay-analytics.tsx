"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const volumeData = [
  { day: "Mon", retail: 2.8, enterprise: 4.1 },
  { day: "Tue", retail: 3.1, enterprise: 4.4 },
  { day: "Wed", retail: 3.6, enterprise: 4.9 },
  { day: "Thu", retail: 3.9, enterprise: 5.2 },
  { day: "Fri", retail: 4.4, enterprise: 5.8 },
  { day: "Sat", retail: 4.1, enterprise: 5.1 },
  { day: "Sun", retail: 4.7, enterprise: 6.2 }
];

const settlementData = [
  { label: "NFC handoffs", value: 32, color: "#4ADE80" },
  { label: "API treasury", value: 28, color: "#66b5ff" },
  { label: "Cross-ledger", value: 18, color: "#ff8583" },
  { label: "Card rails", value: 12, color: "#afafaf" },
  { label: "DeFi liquidity", value: 10, color: "#f3f3f3" }
];

const latencyMatrix = [
  { region: "Americas", lane: "Retail", ms: 41 },
  { region: "Americas", lane: "Enterprise", ms: 52 },
  { region: "Americas", lane: "Treasury", ms: 48 },
  { region: "EMEA", lane: "Retail", ms: 36 },
  { region: "EMEA", lane: "Enterprise", ms: 44 },
  { region: "EMEA", lane: "Treasury", ms: 40 },
  { region: "APAC", lane: "Retail", ms: 33 },
  { region: "APAC", lane: "Enterprise", ms: 38 },
  { region: "APAC", lane: "Treasury", ms: 35 },
  { region: "LATAM", lane: "Retail", ms: 47 },
  { region: "LATAM", lane: "Enterprise", ms: 56 },
  { region: "LATAM", lane: "Treasury", ms: 51 }
];

export function AeternaPayAnalytics() {
  const volumeRef = useRef<SVGSVGElement | null>(null);
  const settlementRef = useRef<SVGSVGElement | null>(null);
  const latencyRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!volumeRef.current) return;
    const svg = d3.select(volumeRef.current);
    const parent = volumeRef.current.parentElement;
    if (!parent) return;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 320);
      const height = 260;
      const margin = { top: 24, right: 36, bottom: 32, left: 52 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const x = d3
        .scaleBand()
        .domain(volumeData.map((d) => d.day))
        .range([0, innerWidth])
        .padding(0.15);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(volumeData, (d) => Math.max(d.retail, d.enterprise))! * 1.2])
        .nice()
        .range([innerHeight, 0]);

      const area = (key: "retail" | "enterprise") =>
        d3
          .area<typeof volumeData[0]>()
          .x((d) => (x(d.day)! + x.bandwidth() / 2))
          .y0(innerHeight)
          .y1((d) => y(d[key]))
          .curve(d3.curveCatmullRom.alpha(0.6));

      const line = (key: "retail" | "enterprise") =>
        d3
          .line<typeof volumeData[0]>()
          .x((d) => (x(d.day)! + x.bandwidth() / 2))
          .y((d) => y(d[key]))
          .curve(d3.curveCatmullRom.alpha(0.6));

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("path")
        .datum(volumeData)
        .attr("fill", "#4ADE80")
        .attr("fill-opacity", 0.24)
        .attr("d", area("retail"));
      g.append("path")
        .datum(volumeData)
        .attr("fill", "#66b5ff")
        .attr("fill-opacity", 0.24)
        .attr("d", area("enterprise"));

      g.append("path")
        .datum(volumeData)
        .attr("fill", "none")
        .attr("stroke", "#4ADE80")
        .attr("stroke-width", 2.2)
        .attr("d", line("retail"));

      g.append("path")
        .datum(volumeData)
        .attr("fill", "none")
        .attr("stroke", "#66b5ff")
        .attr("stroke-width", 2.2)
        .attr("d", line("enterprise"));

      g.selectAll("circle.retail")
        .data(volumeData)
        .join("circle")
        .attr("class", "retail")
        .attr("cx", (d) => x(d.day)! + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.retail))
        .attr("r", 4)
        .attr("fill", "#212121")
        .attr("stroke", "#4ADE80")
        .attr("stroke-width", 1.5);

      g.selectAll("circle.enterprise")
        .data(volumeData)
        .join("circle")
        .attr("class", "enterprise")
        .attr("cx", (d) => x(d.day)! + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.enterprise))
        .attr("r", 4)
        .attr("fill", "#212121")
        .attr("stroke", "#66b5ff")
        .attr("stroke-width", 1.5);

      const xAxis = g
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x));
      xAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      xAxis.selectAll("path, line").attr("stroke", "#333");

      const yAxis = g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat((value) => `$${value}B`));
      yAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      yAxis.selectAll("path, line").attr("stroke", "#333");

      const legend = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top - 10})`)
        .attr("font-size", 11)
        .attr("fill", "#f3f3f3");

      [
        { label: "Retail", color: "#4ADE80" },
        { label: "Enterprise", color: "#66b5ff" }
      ].forEach((entry, index) => {
        const row = legend.append("g").attr("transform", `translate(${index * 120}, 0)`);
        row.append("rect").attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", entry.color);
        row.append("text").attr("x", 18).attr("y", 10).text(entry.label);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!settlementRef.current) return;
    const svg = d3.select(settlementRef.current);
    const parent = settlementRef.current.parentElement;
    if (!parent) return;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 260);
      const height = 260;
      const radius = Math.min(width, height) / 2 - 16;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const arc = d3
        .arc<d3.PieArcDatum<(typeof settlementData)[number]>>()
        .innerRadius(radius * 0.55)
        .outerRadius(radius);

      const pie = d3
        .pie<(typeof settlementData)[number]>()
        .value((d) => d.value)
        .sort(null);

      const arcs = g.selectAll("path").data(pie(settlementData)).join("path");
      arcs
        .attr("fill", (d) => d.data.color)
        .attr("opacity", 0.9)
        .attr("stroke", "#212121")
        .attr("stroke-width", 1)
        .attr("d", arc)
        .append("title")
        .text((d) => `${d.data.label}: ${d.data.value}%`);

      g
        .selectAll("text")
        .data(pie(settlementData))
        .join("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#0d0d0d")
        .attr("font-size", 11)
        .text((d) => `${d.data.value}%`);

      const legend = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height - 24})`)
        .attr("text-anchor", "middle")
        .attr("font-size", 11)
        .attr("fill", "#f3f3f3");

      settlementData.forEach((entry, index) => {
        legend
          .append("text")
          .attr("x", (index - (settlementData.length - 1) / 2) * 120)
          .text(entry.label);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!latencyRef.current) return;
    const svg = d3.select(latencyRef.current);
    const parent = latencyRef.current.parentElement;
    if (!parent) return;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 320);
      const height = 260;
      const margin = { top: 24, right: 24, bottom: 48, left: 96 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const regions = Array.from(new Set(latencyMatrix.map((d) => d.region)));
      const lanes = Array.from(new Set(latencyMatrix.map((d) => d.lane)));

      const x = d3.scaleBand().domain(lanes).range([0, innerWidth]).padding(0.1);
      const y = d3.scaleBand().domain(regions).range([0, innerHeight]).padding(0.1);

      const color = d3
        .scaleSequential(d3.interpolateTurbo)
        .domain([d3.max(latencyMatrix, (d) => d.ms)!, d3.min(latencyMatrix, (d) => d.ms)!]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g
        .selectAll("rect")
        .data(latencyMatrix)
        .join("rect")
        .attr("x", (d) => x(d.lane)!)
        .attr("y", (d) => y(d.region)!)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", (d) => color(d.ms) as string)
        .append("title")
        .text((d) => `${d.region} → ${d.lane}: ${d.ms} ms`);

      g
        .selectAll("text.value")
        .data(latencyMatrix)
        .join("text")
        .attr("class", "value")
        .attr("x", (d) => x(d.lane)! + x.bandwidth() / 2)
        .attr("y", (d) => y(d.region)! + y.bandwidth() / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", "#0d0d0d")
        .attr("font-size", 11)
        .text((d) => `${d.ms}ms`);

      const xAxis = g
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x));
      xAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      xAxis.selectAll("path, line").attr("stroke", "#333");

      const yAxis = g.append("g").call(d3.axisLeft(y));
      yAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      yAxis.selectAll("path, line").attr("stroke", "#333");
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Payment volume trajectories</p>
        <svg ref={volumeRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Weekly flows across retail identities and enterprise treasuries. Values are expressed in billions of credits.
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Settlement composition</p>
        <svg ref={settlementRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Distribution of Aeterna Pay settlement lanes across consumer and institutional rails.
        </p>
      </div>
      <div className="space-y-3 lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Latency envelope</p>
        <svg ref={latencyRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Average completion latency across major corridors. All sessions include biometric attestation and risk scoring.
        </p>
      </div>
    </div>
  );
}
