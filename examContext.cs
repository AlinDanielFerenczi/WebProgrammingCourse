using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using L9.Models;

namespace L9
{
    public partial class examContext : DbContext
    {
        public examContext()
        {
        }

        public examContext(DbContextOptions<examContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Articles> Articles { get; set; }
        public virtual DbSet<Journals> Journals { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
               optionsBuilder.UseMySQL("server=localhost;uid=root;pwd=password;database=exam");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articles>(entity =>
            {
                entity.ToTable("articles");

                entity.HasIndex(e => e.Journalid)
                    .HasName("journalid");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Journalid).HasColumnName("journalid");

                entity.Property(e => e.Summary)
                    .HasColumnName("summary")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.User)
                    .HasColumnName("user")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Journal)
                    .WithMany(p => p.Articles)
                    .HasForeignKey(d => d.Journalid)
                    .HasConstraintName("articles_ibfk_1");
            });

            modelBuilder.Entity<Journals>(entity =>
            {
                entity.ToTable("journals");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
